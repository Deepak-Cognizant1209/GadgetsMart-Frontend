import { Component, OnDestroy, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../core/models';
import { MOCK_PRODUCTS } from '../../core/mock/mock-products';
import { CartActions } from '../../store/cart/cart.actions';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bg: string;
  accent: string;
  heroImage: string;
}

interface CategoryCard {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe, ProductCardComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  slides: HeroSlide[] = [
    {
      title: 'Pro Performance, Redefined',
      subtitle: 'MacBook Pro 14" with M3 Pro Chip — Up to 18 hours battery',
      cta: 'Shop Laptops',
      link: '/category/Laptops',
      bg: 'linear-gradient(135deg, #1d3557 0%, #0d1b2a 100%)',
      accent: '#00bcd4',
      heroImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=500&fit=crop&auto=format&q=80'
    },
    {
      title: 'Sound Without Limits',
      subtitle: 'Sony WH-1000XM5 — Industry-leading noise cancellation',
      cta: 'Shop Headphones',
      link: '/category/Headphones',
      bg: 'linear-gradient(135deg, #2d1b69 0%, #0d1b2a 100%)',
      accent: '#ff6600',
      heroImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=500&fit=crop&auto=format&q=80'
    },
    {
      title: 'Tablet Excellence',
      subtitle: 'iPad Pro 12.9" — M2 chip, Liquid Retina XDR display',
      cta: 'Shop Tablets',
      link: '/category/Tablets',
      bg: 'linear-gradient(135deg, #0d3b2e 0%, #0d1b2a 100%)',
      accent: '#00bcd4',
      heroImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=500&fit=crop&auto=format&q=80'
    }
  ];

  categories: CategoryCard[] = [
    { name: 'Tablets', icon: 'tablet_mac' },
    { name: 'Laptops', icon: 'laptop' },
    { name: 'Mouse', icon: 'mouse' },
    { name: 'Headphones', icon: 'headphones' },
    { name: 'Speakers', icon: 'speaker' }
  ];

  currentSlide = 0;
  prevSlide = -1;
  featuredProducts: Product[] = [...MOCK_PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  private autoTimer: ReturnType<typeof setInterval> | undefined;

  constructor(private store: Store, private ngZone: NgZone) {
    this.startTimer();
  }

  ngOnDestroy(): void { clearInterval(this.autoTimer); }

  private startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.autoTimer = setInterval(() => {
        this.ngZone.run(() => this.nextSlide());
      }, 4000);
    });
  }

  nextSlide(): void {
    this.prevSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlideClick(): void {
    this.prevSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetTimer();
  }

  nextSlideClick(): void {
    this.prevSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetTimer();
  }

  goToSlide(index: number): void {
    this.prevSlide = this.currentSlide;
    this.currentSlide = index;
    this.resetTimer();
  }

  private resetTimer(): void {
    clearInterval(this.autoTimer);
    this.startTimer();
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1, selectedColor: product.colors[0] }));
  }
}
