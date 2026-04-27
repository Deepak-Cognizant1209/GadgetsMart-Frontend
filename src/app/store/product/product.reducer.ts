import { createReducer, on } from '@ngrx/store';
import { Product, PagedResponse, ProductFilter } from '../../core/models';
import { ProductActions } from './product.actions';

export interface ProductState {
  products: PagedResponse<Product> | null;
  selectedProduct: Product | null;
  relatedProducts: Product[];
  filters: ProductFilter;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: null,
  selectedProduct: null,
  relatedProducts: [],
  filters: {},
  loading: false,
  detailLoading: false,
  error: null
};

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.loadProducts, (state, { filters }) => ({
    ...state, loading: true, error: null, filters
  })),
  on(ProductActions.loadProductsSuccess, (state, { response }) => ({
    ...state, loading: false, products: response
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
  on(ProductActions.loadProductById, state => ({
    ...state, detailLoading: true, error: null
  })),
  on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state, detailLoading: false, selectedProduct: product
  })),
  on(ProductActions.loadProductByIdFailure, (state, { error }) => ({
    ...state, detailLoading: false, error
  })),
  on(ProductActions.loadRelatedProductsSuccess, (state, { products }) => ({
    ...state, relatedProducts: products
  })),
  on(ProductActions.setFilters, (state, { filters }) => ({
    ...state, filters: { ...state.filters, ...filters }
  })),
  on(ProductActions.clearSelectedProduct, state => ({
    ...state, selectedProduct: null, relatedProducts: []
  }))
);
