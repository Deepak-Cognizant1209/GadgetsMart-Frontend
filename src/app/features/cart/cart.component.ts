import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../core/models';
import { selectCartItems, selectCartTotal, selectCartCount } from '../../store/cart/cart.selectors';
import { CartActions } from '../../store/cart/cart.actions';
import { QuantityInputComponent } from '../../shared/components/quantity-input/quantity-input.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, AsyncPipe, CurrencyPipe, QuantityInputComponent, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items$;
  total$;
  count$;

  constructor(private store: Store, private snack: MatSnackBar) {
    this.items$ = store.select(selectCartItems);
    this.total$ = store.select(selectCartTotal);
    this.count$ = store.select(selectCartCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  updateQty(item: CartItem, qty: number): void {
    this.store.dispatch(CartActions.updateQuantity({ productId: item.productId, selectedColor: item.selectedColor, quantity: qty }));
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(CartActions.removeItem({ productId: item.productId, selectedColor: item.selectedColor }));
    const ref = this.snack.open(`${item.product.name} removed`, 'Undo', { duration: 4000 });
    ref.onAction().subscribe(() => {
      this.store.dispatch(CartActions.addItem({ product: item.product, quantity: item.quantity, selectedColor: item.selectedColor }));
    });
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  getLineTotal(item: CartItem): number {
    return (item.product.discountPrice ?? item.product.price) * item.quantity;
  }

  getTax(subtotal: number): number { return +(subtotal * 0.1).toFixed(2); }
  getOrderTotal(subtotal: number): number { return +(subtotal + this.getTax(subtotal)).toFixed(2); }
}
