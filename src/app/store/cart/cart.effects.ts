import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';
import { CartActions } from './cart.actions';

export const loadCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() => cartService.getCart().pipe(
        map(cart => CartActions.loadCartSuccess({ cart }))
      ))
    ),
  { functional: true }
);

export const addItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService), snack = inject(MatSnackBar)) =>
    actions$.pipe(
      ofType(CartActions.addItem),
      tap(({ product, quantity, selectedColor }) => {
        cartService.addToCart(product, quantity, selectedColor);
        snack.open(`${product.name} added to cart!`, 'View Cart', { duration: 3000 });
      }),
      switchMap(() => cartService.getCart().pipe(
        map(cart => CartActions.loadCartSuccess({ cart }))
      ))
    ),
  { functional: true }
);

export const removeItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.removeItem),
      tap(({ productId, selectedColor }) => cartService.removeFromCart(productId, selectedColor)),
      switchMap(() => cartService.getCart().pipe(
        map(cart => CartActions.loadCartSuccess({ cart }))
      ))
    ),
  { functional: true }
);

export const updateQuantityEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.updateQuantity),
      tap(({ productId, selectedColor, quantity }) =>
        cartService.updateQuantity(productId, selectedColor, quantity)
      ),
      switchMap(() => cartService.getCart().pipe(
        map(cart => CartActions.loadCartSuccess({ cart }))
      ))
    ),
  { functional: true }
);

export const clearCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(CartActions.clearCart),
      tap(() => cartService.clearCart())
    ),
  { functional: true, dispatch: false }
);
