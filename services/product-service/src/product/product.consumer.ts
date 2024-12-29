import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { OrderCreatedEvent } from './event/order.created.event';
import { Controller } from '@nestjs/common';

@Controller()
export class ProductConsumer {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('order-created')
  async handleOrderCreated(@Payload() data: OrderCreatedEvent) {
    console.log(`Order created event received: ${JSON.stringify(data)}`);
    await this.productService.handleOrderCreatedEvent(data);
  }
}
