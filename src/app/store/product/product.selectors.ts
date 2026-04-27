import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');
export const selectProductsPage = createSelector(selectProductState, s => s.products);
export const selectProducts = createSelector(selectProductState, s => s.products?.content ?? []);
export const selectSelectedProduct = createSelector(selectProductState, s => s.selectedProduct);
export const selectRelatedProducts = createSelector(selectProductState, s => s.relatedProducts);
export const selectProductLoading = createSelector(selectProductState, s => s.loading);
export const selectProductDetailLoading = createSelector(selectProductState, s => s.detailLoading);
export const selectProductFilters = createSelector(selectProductState, s => s.filters);
export const selectProductError = createSelector(selectProductState, s => s.error);
