export interface OrderCreatedEvent {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  status: string;
}
