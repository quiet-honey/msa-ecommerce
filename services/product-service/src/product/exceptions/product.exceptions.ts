export class ProductError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ProductNotFoundError extends ProductError {
  constructor(productId: number) {
    super(`Product with ID ${productId} not found`);
  }
}

export class ProductSoldOutError extends ProductError {
  constructor(productId: number) {
    super(`Product with Id ${productId} is sold out`);
  }
}
