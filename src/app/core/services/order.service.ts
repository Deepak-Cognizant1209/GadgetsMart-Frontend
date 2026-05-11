import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order, PlaceOrderRequest } from '../models';
import { MOCK_PRODUCTS } from '../mock/mock-products';

// TODO (Spring Boot): replace each method body with an HttpClient call.
// POST /api/orders  |  GET /api/orders/my  |  GET /api/orders/{id}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ORDERS_KEY = 'gadgets_orders';

  private loadOrders(): Order[] {
    try {
      const raw = localStorage.getItem(this.ORDERS_KEY);
      if (raw) return JSON.parse(raw) as Order[];
    } catch { /* ignore */ }
    return [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    const orders = this.loadOrders();
    const newOrder: Order = {
      id: Date.now(),
      userId: 1,
      items: request.items.map(i => {
        const product = MOCK_PRODUCTS.find(p => p.id === i.productId);
        return {
          productId: i.productId,
          productName: product?.name ?? 'Unknown',
          quantity: i.quantity,
          price: product?.discountPrice ?? product?.price ?? 0,
          color: i.color
        };
      }),
      shippingAddress: request.shippingAddress,
      subtotal: 0,
      tax: 0,
      total: 0,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };
    newOrder.subtotal = newOrder.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    newOrder.tax = +(newOrder.subtotal * 0.1).toFixed(2);
    newOrder.total = +(newOrder.subtotal + newOrder.tax).toFixed(2);
    orders.push(newOrder);
    this.saveOrders(orders);
    return of(newOrder);
  }

  getMyOrders(): Observable<Order[]> {
    return of([...this.loadOrders()].reverse());
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return of(this.loadOrders().find(o => o.id === id));
  }
}
