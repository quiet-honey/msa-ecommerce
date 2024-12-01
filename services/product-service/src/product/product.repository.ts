import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductNotFoundException } from './exceptions/product.exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findByIdOrThrow(productId: number): Promise<Product> {
    const product = await this.findOne({ where: { id: productId } });
    if (!product) throw new ProductNotFoundException(productId);
    return product;
  }
}
