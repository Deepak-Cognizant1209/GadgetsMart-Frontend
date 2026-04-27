import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  orders: Order[] = [];
  profileForm: FormGroup;
  saving = false;

  statusColors: Record<string, string> = {
    PENDING: '#ff9800', CONFIRMED: '#00bcd4', SHIPPED: '#9c27b0',
    DELIVERED: '#4caf50', CANCELLED: '#f44336'
  };

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private snack: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(o => this.orders = o);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      this.snack.open('Profile updated!', 'OK', { duration: 3000 });
    }, 600);
  }
}
