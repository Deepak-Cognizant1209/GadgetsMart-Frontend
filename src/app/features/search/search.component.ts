import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, distinctUntilChanged, map, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductFilter } from '../../core/models';
import { ProductActions } from '../../store/product/product.actions';
import { selectProducts, selectProductLoading, selectProductFilters } from '../../store/product/product.selectors';
import { CartActions } from '../../store/cart/cart.actions';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-search',
  imports: [RouterLink, FormsModule, AsyncPipe, ProductCardComponent, SkeletonCardComponent, EmptyStateComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  query = '';
  sortBy = '';
  skeletons = Array(8).fill(0);
  sortOptions = [
    { label: 'Relevance', value: '' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
    { label: 'Most Popular', value: 'popularity' }
  ];
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductLoading);

    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      map(p => (p['q'] as string) ?? ''),
      distinctUntilChanged()
    ).subscribe(q => {
      this.query = q;
      this.store.select(selectProductFilters).pipe(take(1)).subscribe(currentFilters => {
        if (currentFilters.search !== q) {
          this.search();
        }
      });
    });
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  search(): void {
    const filters: ProductFilter = {
      search: this.query,
      sort: this.sortBy as ProductFilter['sort'] || undefined,
      page: 0,
      size: 24
    };
    this.store.dispatch(ProductActions.loadProducts({ filters }));
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1, selectedColor: product.colors[0] }));
  }
}
