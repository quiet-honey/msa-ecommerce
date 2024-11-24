import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { OrderCreatedEvent } from './event/order.created.event';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  // 새로운 주문 핸들링
  async handleOrderCreatedEvent(orderData: OrderCreatedEvent): Promise<void> {
    console.log('New order received:');
    console.log(`ID: ${orderData.id}`);
    console.log(`Product ID: ${orderData.productId}`);
    console.log(`Quantity: ${orderData.quantity}`);
    console.log(`Price: ${orderData.price}`);
    console.log(`Status: ${orderData.status}`);
  }
}
