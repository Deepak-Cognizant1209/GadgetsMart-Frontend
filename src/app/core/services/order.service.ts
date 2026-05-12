import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest, OrderResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = environment.ordersApiUrl;

  constructor(private http: HttpClient) {}

  placeOrder(request: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.baseUrl, request);
  }

  getMyOrders(userId: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/user/${userId}`);
  }

  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.baseUrl}/${id}`);
  }

  cancelOrder(id: number): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
