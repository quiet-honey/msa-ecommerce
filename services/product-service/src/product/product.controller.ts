import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderCreatedEvent } from './event/order.created.event';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    await this.productService.create({
      name: 'Test Product',
      price: 19.99,
      stock: 100,
      description: 'Sample product',
    });
    return await this.productService.findAllProducts();
  }

  @MessagePattern('order-created')
  async handleOrderCreated(@Payload() data: OrderCreatedEvent) {
    await this.productService.handleOrderCreatedEvent(data);
  }
}
