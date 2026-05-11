import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Product, ProductFilter } from '../../core/models';
import { ProductActions } from '../../store/product/product.actions';
import { selectProducts, selectProductLoading } from '../../store/product/product.selectors';
import { CartActions } from '../../store/cart/cart.actions';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-search',
  imports: [RouterLink, FormsModule, ProductCardComponent, SkeletonCardComponent, EmptyStateComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
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
    this.store.select(selectProducts).pipe(takeUntil(this.destroy$)).subscribe(p => this.products = p);
    this.store.select(selectProductLoading).pipe(takeUntil(this.destroy$)).subscribe(l => this.loading = l);
    this.route.queryParams.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe(p => {
      this.query = (p['q'] as string) ?? '';
      this.search();
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
