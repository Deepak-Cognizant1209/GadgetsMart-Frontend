export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemResponse {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderResponse {
  id: number;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemResponse[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItemRequest[];
}

export type Order = OrderResponse;
export type PlaceOrderRequest = OrderRequest;
