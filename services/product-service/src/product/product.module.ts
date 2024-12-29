import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_OPTION } from 'src/config';
import { ProductConsumer } from './product.consumer';
import { ProductProducer } from './product.producer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([KAFKA_OPTION]),
  ],
  providers: [ProductService, ProductRepository, ProductProducer],
  controllers: [ProductController, ProductConsumer],
  exports: [ProductRepository],
})
export class ProductModule {}
