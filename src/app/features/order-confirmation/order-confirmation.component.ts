import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models';

@Component({
  selector: 'app-order-confirmation',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  estimatedDelivery: Date;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.estimatedDelivery = new Date();
    this.estimatedDelivery.setDate(this.estimatedDelivery.getDate() + 5);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['orderId'];
    this.orderService.getOrderById(id).subscribe(o => { if (o) this.order = o; });
  }
}
