import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KAFKA_OPTION, PSQL_OPTION } from './config';
import { ProductModule } from './product/product.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([KAFKA_OPTION]),
    TypeOrmModule.forRootAsync(PSQL_OPTION),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
