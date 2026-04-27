import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly CART_KEY = 'gadgets_cart';
  private cartSubject = new BehaviorSubject<Cart>(this.loadCart());

  cart$ = this.cartSubject.asObservable();

  private loadCart(): Cart {
    try {
      const raw = localStorage.getItem(this.CART_KEY);
      if (raw) return JSON.parse(raw) as Cart;
    } catch { /* ignore */ }
    return { items: [], totalItems: 0, totalPrice: 0 };
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private recalculate(items: CartItem[]): Cart {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce(
      (sum, i) => sum + (i.product.discountPrice ?? i.product.price) * i.quantity,
      0
    );
    return { items, totalItems, totalPrice };
  }

  getCart(): Observable<Cart> {
    return this.cart$;
  }

  addToCart(product: Product, quantity: number, selectedColor: string): void {
    const current = this.cartSubject.getValue();
    const existing = current.items.find(
      i => i.productId === product.id && i.selectedColor === selectedColor
    );

    let items: CartItem[];
    if (existing) {
      items = current.items.map(i =>
        i.productId === product.id && i.selectedColor === selectedColor
          ? { ...i, quantity: Math.min(i.quantity + quantity, 10) }
          : i
      );
    } else {
      items = [...current.items, { productId: product.id, product, quantity, selectedColor }];
    }

    this.saveCart(this.recalculate(items));
  }

  updateQuantity(productId: number, selectedColor: string, quantity: number): void {
    const current = this.cartSubject.getValue();
    const items = current.items.map(i =>
      i.productId === productId && i.selectedColor === selectedColor
        ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) }
        : i
    );
    this.saveCart(this.recalculate(items));
  }

  removeFromCart(productId: number, selectedColor: string): void {
    const current = this.cartSubject.getValue();
    const items = current.items.filter(
      i => !(i.productId === productId && i.selectedColor === selectedColor)
    );
    this.saveCart(this.recalculate(items));
  }

  clearCart(): void {
    this.saveCart({ items: [], totalItems: 0, totalPrice: 0 });
  }

  getItemCount(): number {
    return this.cartSubject.getValue().totalItems;
  }
}
