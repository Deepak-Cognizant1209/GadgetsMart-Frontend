import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, PagedResponse, ProductFilter } from '../../core/models';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': props<{ filters: ProductFilter }>(),
    'Load Products Success': props<{ response: PagedResponse<Product> }>(),
    'Load Products Failure': props<{ error: string }>(),
    'Load Product By Id': props<{ id: number }>(),
    'Load Product By Id Success': props<{ product: Product }>(),
    'Load Product By Id Failure': props<{ error: string }>(),
    'Load Related Products': props<{ product: Product }>(),
    'Load Related Products Success': props<{ products: Product[] }>(),
    'Set Filters': props<{ filters: ProductFilter }>(),
    'Clear Selected Product': emptyProps(),
  }
});
