import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/models';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, StarRatingComponent],
  template: `
    <div class="product-card" [routerLink]="['/product', product.id]">
      <div class="card-image">
        <img [src]="product.images[0]" [alt]="product.name" (error)="onImgError($event)" />
        @if (product.discountPrice) {
          <span class="badge-discount">SALE</span>
        }
        @if (!product.inStock) {
          <div class="out-of-stock-overlay">Out of Stock</div>
        }
      </div>
      <div class="card-body">
        <p class="brand">{{ product.brand }}</p>
        <h3 class="name">{{ product.name }}</h3>
        <app-star-rating [rating]="product.rating" [count]="product.reviewCount" />
        <div class="price-row">
          @if (product.discountPrice) {
            <span class="price-new">{{ product.discountPrice | currency:'INR':'symbol':'1.0-0' }}</span>
            <span class="price-old">{{ product.price | currency:'INR':'symbol':'1.0-0' }}</span>
          } @else {
            <span class="price-new">{{ product.price | currency:'INR':'symbol':'1.0-0' }}</span>
          }
        </div>
        <button class="add-btn" (click)="onAddToCart($event)"
                [disabled]="!product.inStock" aria-label="Add to cart">
          <span class="material-icons">shopping_cart</span>
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .product-card {
      background: var(--gm-bg-card);
      border: 1px solid var(--gm-border);
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .product-card:hover { transform: translateY(-4px); box-shadow: var(--gm-shadow-card); }
    .card-image { width: 100%; aspect-ratio: 1 / 1; overflow: hidden; background: var(--gm-bg-secondary); position: relative; }
    .card-image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
    .product-card:hover .card-image img { transform: scale(1.05); }
    .badge-discount {
      position: absolute; top: 8px; left: 8px;
      background: #ff6600; color: #fff; font-size: 0.7rem;
      padding: 2px 8px; border-radius: 4px; font-weight: 600;
    }
    .out-of-stock-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 0.875rem; font-weight: 500;
    }
    .card-body { padding: 12px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .brand { margin: 0; color: var(--gm-text-sub); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .name { margin: 0; color: var(--gm-text); font-size: 0.9rem; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .price-row { display: flex; align-items: center; gap: 8px; margin-top: auto; }
    .price-new { color: #00bcd4; font-size: 1rem; font-weight: 600; }
    .price-old { color: var(--gm-text-muted); font-size: 0.8rem; text-decoration: line-through; }
    .add-btn {
      width: 100%; padding: 8px; background: #00bcd4; color: #1a1a1a;
      border: none; border-radius: 4px; font-size: 0.8rem; font-weight: 500;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
      margin-top: 8px; transition: background 0.15s;
    }
    .add-btn:hover:not(:disabled) { background: #00acc1; }
    .add-btn:disabled { background: var(--gm-bg-elevated); color: var(--gm-text-muted); cursor: not-allowed; }
    .add-btn .material-icons { font-size: 16px; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    const icons: Record<string, string> = {
      Tablets: '🖥', Laptops: '💻', Mouse: '🖱', Headphones: '🎧', Speakers: '🔊'
    };
    const icon = icons[this.product.category] ?? '📦';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>`
      + `<rect width='400' height='400' fill='%231e1e1e'/>`
      + `<text x='200' y='170' font-size='80' text-anchor='middle' dominant-baseline='middle'>${icon}</text>`
      + `<text x='200' y='260' font-family='Arial,sans-serif' font-size='20' fill='%2300bcd4' text-anchor='middle'>${this.product.name}</text>`
      + `</svg>`;
    img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
  }
}
