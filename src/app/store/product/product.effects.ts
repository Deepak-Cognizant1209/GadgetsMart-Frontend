import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { ProductActions } from './product.actions';

export const loadProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) =>
    actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(({ filters }) =>
        productService.getProducts(filters).pipe(
          map(response => ProductActions.loadProductsSuccess({ response })),
          catchError(err => of(ProductActions.loadProductsFailure({ error: err.message })))
        )
      )
    ),
  { functional: true }
);

export const loadProductByIdEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) =>
    actions$.pipe(
      ofType(ProductActions.loadProductById),
      switchMap(({ id }) =>
        productService.getProductById(id).pipe(
          map(product => ProductActions.loadProductByIdSuccess({ product })),
          catchError(err => of(ProductActions.loadProductByIdFailure({ error: err.message })))
        )
      )
    ),
  { functional: true }
);

export const loadRelatedProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) =>
    actions$.pipe(
      ofType(ProductActions.loadRelatedProducts),
      switchMap(({ product }) =>
        productService.getRelatedProducts(product).pipe(
          map(products => ProductActions.loadRelatedProductsSuccess({ products }))
        )
      )
    ),
  { functional: true }
);
