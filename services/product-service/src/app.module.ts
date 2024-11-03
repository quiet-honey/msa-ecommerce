import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PSQL_OPTION } from './config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(PSQL_OPTION), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
