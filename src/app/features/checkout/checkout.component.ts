import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderService } from '../../core/services/order.service';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import { CartActions } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, AsyncPipe, CurrencyPipe, MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items$;
  total$;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  placing = false;

  countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India'];

  constructor(private fb: FormBuilder, private store: Store, private orderService: OrderService, private router: Router) {
    this.items$ = store.select(selectCartItems);
    this.total$ = store.select(selectCartTotal);
    this.shippingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      country: ['United States', Validators.required]
    });
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  ngOnInit(): void { this.store.dispatch(CartActions.loadCart()); }

  getTax(subtotal: number): number { return +(subtotal * 0.1).toFixed(2); }
  getTotal(subtotal: number): number { return +(subtotal + this.getTax(subtotal)).toFixed(2); }

  formatCard(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 16);
    this.paymentForm.get('cardNumber')!.setValue(input.value, { emitEvent: false });
  }

  placeOrder(): void {
    this.placing = true;
    const addr = this.shippingForm.value as { fullName: string; street: string; city: string; state: string; zipCode: string; country: string };
    this.items$.subscribe(items => {
      this.orderService.placeOrder({
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity, color: i.selectedColor })),
        shippingAddress: addr,
        paymentMethod: 'card'
      }).subscribe(order => {
        this.store.dispatch(CartActions.clearCart());
        this.router.navigate(['/order-confirmation', order.id]);
      });
    }).unsubscribe();
  }
}
