import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    await this.productService.create({
      name: 'Test Product',
      price: 19.99,
      description: 'Sample product',
    });
    return await this.productService.findAllProducts();
  }
}
