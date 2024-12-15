import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { OrderCreatedEvent } from './event/order.created.event';
import {
  ProductError,
  ProductSoldOutError,
} from './exceptions/product.exceptions';
import { ProductRepository } from './product.repository';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  // 상품 생성
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  // 상품 전체 조회
  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // 상품 재고 차감
  async deductStock(productId: number, quantity: number): Promise<void> {
    const product = await this.productRepository.findByIdOrThrow(productId);

    product.stock -= quantity;
    if (product.stock < 0) {
      throw new ProductSoldOutError(productId);
    }

    this.productRepository.save(product);
  }

  // 주문 취소
  cancelOrder(orderId: number, productId: number, message: string): void {
    const event = { orderId, productId, message };
    this.kafkaClient.emit('order-cancelled', JSON.stringify(event)),
      console.log('emit order-cancelled event');
  }

  // 새로운 주문 핸들링
  async handleOrderCreatedEvent(orderData: OrderCreatedEvent): Promise<void> {
    const { id, productId, quantity } = orderData;

    try {
      await this.deductStock(productId, quantity);
    } catch (e) {
      if (e instanceof ProductError) {
        console.error(`Failed to deduct stock for order ${id}: ${e.message}`);
        this.cancelOrder(id, productId, e.message);
      } else {
        console.log(`Unknown error occurred: ${e.message}`);
        throw e;
      }
    }
  }
}
