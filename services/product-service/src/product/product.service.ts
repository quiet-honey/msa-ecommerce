import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { OrderCreatedEvent } from './event/order.created.event';
import { ProductSoldOut as ProductSoldOutException } from './exceptions/product.exceptions';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  // 상품 생성
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  // 상품 전체 조회
  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // 새로운 주문 핸들링
  async handleOrderCreatedEvent(orderData: OrderCreatedEvent): Promise<void> {
    const { productId, quantity } = orderData;
    const product = await this.productRepository.findByIdOrThrow(productId);

    product.stock -= quantity;
    if (product.stock < 0) {
      throw new ProductSoldOutException(productId);
    }

    this.productRepository.save(product);
  }
}
