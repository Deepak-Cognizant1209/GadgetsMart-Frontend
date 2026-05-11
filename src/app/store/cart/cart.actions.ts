import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart, Product } from '../../core/models';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Load Cart Success': props<{ cart: Cart }>(),
    'Add Item': props<{ product: Product; quantity: number; selectedColor: string }>(),
    'Remove Item': props<{ productId: number; selectedColor: string }>(),
    'Update Quantity': props<{ productId: number; selectedColor: string; quantity: number }>(),
    'Clear Cart': emptyProps(),
  }
});
