import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: number) {
    super(`Product with ID ${productId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class ProductSoldOut extends HttpException {
  constructor(productId: number) {
    super(`Product with Id ${productId} is sold out`, HttpStatus.BAD_REQUEST);
  }
}
