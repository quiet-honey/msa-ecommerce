import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAllProducts();
  }

  @Get('test')
  async test() {
    await this.productService.create({
      name: 'Test Product',
      price: 19.99,
      stock: 100,
      description: 'Sample product',
    });
    return 'Test product created';
  }
}
