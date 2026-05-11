import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCart = createSelector(selectCartState, s => s.cart);
export const selectCartItems = createSelector(selectCart, c => c.items);
export const selectCartTotal = createSelector(selectCart, c => c.totalPrice);
export const selectCartCount = createSelector(selectCart, c => c.totalItems);
export const selectCartLoading = createSelector(selectCartState, s => s.loading);
