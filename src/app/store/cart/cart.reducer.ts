import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../core/models';
import { CartActions } from './cart.actions';

export interface CartState {
  cart: Cart;
  loading: boolean;
}

const emptyCart: Cart = { items: [], totalItems: 0, totalPrice: 0 };

export const initialCartState: CartState = {
  cart: emptyCart,
  loading: false
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.loadCart, state => ({ ...state, loading: true })),
  on(CartActions.loadCartSuccess, (state, { cart }) => ({ ...state, cart, loading: false })),
  on(CartActions.clearCart, state => ({ ...state, cart: emptyCart }))
);
