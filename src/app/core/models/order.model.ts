export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  color: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface PlaceOrderRequest {
  items: { productId: number; quantity: number; color: string }[];
  shippingAddress: Address;
  paymentMethod: string;
}
