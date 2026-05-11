import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductFilter } from '../../core/models';
import { MOCK_PRODUCTS } from '../../core/mock/mock-products';
import { ProductActions } from '../../store/product/product.actions';
import { selectProducts, selectProductLoading, selectProductsPage } from '../../store/product/product.selectors';
import { CartActions } from '../../store/cart/cart.actions';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [
    RouterLink, FormsModule, AsyncPipe, DecimalPipe,
    MatSliderModule, MatCheckboxModule,
    MatPaginatorModule, MatSidenavModule, MatButtonModule, MatIconModule,
    ProductCardComponent, SkeletonCardComponent, EmptyStateComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  page$: Observable<import('../../core/models').PagedResponse<Product> | null>;

  categoryName = '';
  sidebarOpen = true;
  skeletons = Array(12).fill(0);

  // Filters
  priceMin = 0;
  priceMax = 200000;
  selectedBrands: string[] = [];
  selectedRating = 0;
  sortBy = '';
  currentPage = 0;
  pageSize = 12;

  availableBrands: string[] = [];
  ratingOptions = [
    { label: '4★ & above', value: 4 },
    { label: '3★ & above', value: 3 },
    { label: '2★ & above', value: 2 }
  ];
  sortOptions = [
    { label: 'Relevance', value: '' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
    { label: 'Most Popular', value: 'popularity' },
    { label: 'Newest', value: 'newest' }
  ];

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store) {
    this.products$ = store.select(selectProducts);
    this.loading$ = store.select(selectProductLoading);
    this.page$ = store.select(selectProductsPage);
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe(p => {
      this.categoryName = p['categoryName'];
      this.currentPage = 0;
      this.selectedBrands = [];
      this.selectedRating = 0;
      this.sortBy = '';
      this.availableBrands = [...new Set(
        MOCK_PRODUCTS.filter(p => p.category === this.categoryName).map(p => p.brand)
      )];
      this.loadProducts();
    });
    if (window.innerWidth < 768) this.sidebarOpen = false;
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  get activeFilterCount(): number {
    let count = 0;
    if (this.selectedBrands.length > 0) count++;
    if (this.priceMin > 0 || this.priceMax < 200000) count++;
    if (this.selectedRating > 0) count++;
    return count;
  }

  loadProducts(): void {
    const filters: ProductFilter = {
      category: this.categoryName,
      minPrice: this.priceMin > 0 ? this.priceMin : undefined,
      maxPrice: this.priceMax < 200000 ? this.priceMax : undefined,
      brands: this.selectedBrands.length > 0 ? [...this.selectedBrands] : undefined,
      rating: this.selectedRating || undefined,
      sort: this.sortBy as ProductFilter['sort'] || undefined,
      page: this.currentPage,
      size: this.pageSize
    };
    this.store.dispatch(ProductActions.loadProducts({ filters }));
  }

  toggleBrand(brand: string): void {
    const idx = this.selectedBrands.indexOf(brand);
    if (idx > -1) this.selectedBrands.splice(idx, 1);
    else this.selectedBrands.push(brand);
    this.currentPage = 0;
    this.loadProducts();
  }

  isBrandSelected(brand: string): boolean { return this.selectedBrands.includes(brand); }

  onPriceChange(): void { this.currentPage = 0; this.loadProducts(); }

  onRatingChange(value: number): void {
    this.selectedRating = this.selectedRating === value ? 0 : value;
    this.currentPage = 0;
    this.loadProducts();
  }

  onSortChange(): void { this.currentPage = 0; this.loadProducts(); }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearPrice(): void { this.priceMin = 0; this.priceMax = 200000; this.currentPage = 0; this.loadProducts(); }

  clearFilters(): void {
    this.priceMin = 0; this.priceMax = 200000;
    this.selectedBrands = []; this.selectedRating = 0; this.sortBy = '';
    this.currentPage = 0;
    this.loadProducts();
  }

  getStars(rating: number): string { return '★'.repeat(rating) + '☆'.repeat(5 - rating); }

  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1, selectedColor: product.colors[0] }));
  }
}
