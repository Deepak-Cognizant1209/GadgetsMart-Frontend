import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Product } from '../../core/models';
import { ProductActions } from '../../store/product/product.actions';
import { selectSelectedProduct, selectProductDetailLoading, selectRelatedProducts } from '../../store/product/product.selectors';
import { CartActions } from '../../store/cart/cart.actions';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { QuantityInputComponent } from '../../shared/components/quantity-input/quantity-input.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, AsyncPipe, CurrencyPipe, MatTabsModule, StarRatingComponent, QuantityInputComponent, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<Product | null>;
  loading$: Observable<boolean>;
  related$: Observable<Product[]>;

  selectedImage = 0;
  selectedColor = '';
  quantity = 1;
  skeletons = Array(4).fill(0);

  mockReviews = [
    // ── Global reviews (shown on every product) ──
    { id: 1, productId: 0, name: 'Rahul S.', avatar: 'RS', date: 'March 2025', rating: 5,
      title: 'Excellent product — totally worth it!',
      body: 'Really impressed with the build quality and performance. Exactly as described and delivery was super quick. Packaging was secure with no damage at all.',
      verified: true },
    { id: 2, productId: 0, name: 'Priya M.', avatar: 'PM', date: 'February 2025', rating: 4,
      title: 'Great value for money',
      body: 'Works perfectly as expected. Setup was straightforward and the product feels premium. Minor delay in delivery but overall a very satisfying purchase.',
      verified: true },
    { id: 3, productId: 0, name: 'Amit K.', avatar: 'AK', date: 'January 2025', rating: 5,
      title: 'Best purchase I\'ve made this year',
      body: 'Outstanding quality and exactly what I needed. Features are spot-on. I\'ve already recommended it to my friends and family.',
      verified: false },

    // ── Product-specific reviews ──
    { id: 4, productId: 1, name: 'Vikram T.', avatar: 'VT', date: 'April 2025', rating: 2,
      title: 'Overpriced for what it offers',
      body: 'Display is great but hard to justify the price. Battery life dropped noticeably after a few weeks. Expected more from a flagship product.',
      verified: true },
    { id: 5, productId: 2, name: 'Sneha R.', avatar: 'SR', date: 'March 2025', rating: 1,
      title: 'Disappointed with build quality',
      body: 'The screen developed a dead pixel within the first month. Customer support was unhelpful. Would not recommend at this price point.',
      verified: false },
    { id: 6, productId: 3, name: 'Deepak M.', avatar: 'DM', date: 'February 2025', rating: 3,
      title: 'Decent but runs warm',
      body: 'Performance is fine for everyday tasks but the device gets uncomfortably warm under moderate load. Keyboard cover sold separately is frustrating.',
      verified: true },
    { id: 7, productId: 4, name: 'Anjali P.', avatar: 'AP', date: 'January 2025', rating: 2,
      title: 'Software updates are too slow',
      body: 'Hardware is fine but software support is lacking. Updates arrive very late and the UI feels sluggish compared to competitors at this price.',
      verified: true },
    { id: 8, productId: 5, name: 'Suresh K.', avatar: 'SK', date: 'March 2025', rating: 1,
      title: 'Not worth the price in India',
      body: 'For this price I expected perfection. Fan noise is audible even under light loads and the notch design feels outdated. Needed better value.',
      verified: false },
    { id: 9, productId: 6, name: 'Kavitha N.', avatar: 'KN', date: 'April 2025', rating: 3,
      title: 'Good specs, poor thermals',
      body: 'CPU performance is great but the laptop throttles heavily under sustained load. The 15-inch chassis still gets too hot for lap use.',
      verified: true },
    { id: 10, productId: 7, name: 'Rohit B.', avatar: 'RB', date: 'February 2025', rating: 2,
      title: 'Touchpad issues after BIOS update',
      body: 'After a BIOS update the touchpad became unreliable. HP support acknowledged the issue but no fix yet. Battery life also shorter than advertised.',
      verified: true },
    { id: 11, productId: 8, name: 'Nisha S.', avatar: 'NS', date: 'January 2025', rating: 1,
      title: 'Screen flickering problem',
      body: 'The OLED panel started flickering at low brightness after just two weeks. ASUS service took 3 weeks to return it. Quite disappointed.',
      verified: false },
    { id: 12, productId: 9, name: 'Arjun D.', avatar: 'AD', date: 'April 2025', rating: 3,
      title: 'Good but scroll wheel squeaks',
      body: 'The MagSpeed scroll wheel developed a squeak after a month of use. Ergonomics are excellent but quality control could be better at this price.',
      verified: true },
    { id: 13, productId: 10, name: 'Pooja G.', avatar: 'PG', date: 'March 2025', rating: 2,
      title: 'Cable frays quickly',
      body: 'The SpeedFlex cable started fraying near the connector after two months. Sensor performance is top-notch but build quality is not on par with the price.',
      verified: true },
    { id: 14, productId: 11, name: 'Kiran L.', avatar: 'KL', date: 'February 2025', rating: 1,
      title: 'Charges on the bottom — unusable while charging',
      body: 'The Lightning port is on the underside so you cannot use the mouse while charging. This basic design flaw makes daily use very frustrating.',
      verified: false },
    { id: 15, productId: 12, name: 'Preethi V.', avatar: 'PV', date: 'January 2025', rating: 3,
      title: 'Clever design, mediocre scroll strip',
      body: 'The flat-to-arc form factor is genuinely clever and portable. However the scroll strip is imprecise and takes time to get used to.',
      verified: true },
    { id: 16, productId: 13, name: 'Manoj C.', avatar: 'MC', date: 'April 2025', rating: 2,
      title: 'ANC not as impressive as claimed',
      body: 'ANC is good but not a big leap from the XM4. Call quality is average and the headband lacks padding for long sessions.',
      verified: true },
    { id: 17, productId: 14, name: 'Divya H.', avatar: 'DH', date: 'March 2025', rating: 1,
      title: 'Right earcup cracked within weeks',
      body: 'The plastic on the right earcup cracked within 3 weeks of normal use. Bose support refused warranty coverage. Very disappointing quality.',
      verified: false },
    { id: 18, productId: 15, name: 'Sanjay F.', avatar: 'SF', date: 'February 2025', rating: 3,
      title: 'Premium sound, outdated connector',
      body: 'Sound quality is phenomenal and the build is luxurious. But still using Lightning in 2024 is inexcusable. Case also shows smudges very easily.',
      verified: true },
    { id: 19, productId: 16, name: 'Lakshmi W.', avatar: 'LW', date: 'January 2025', rating: 2,
      title: 'Fatiguing for casual listening',
      body: 'The analytical sound signature suits audiophiles but is tiring for casual music. No carrying case included is a big miss at this price.',
      verified: true },
    { id: 20, productId: 17, name: 'Nikhil X.', avatar: 'NX', date: 'April 2025', rating: 1,
      title: 'Stopped charging after 2 months',
      body: 'The USB-C port became loose and stopped charging. JBL service took forever to process the warranty claim. Music quality was good while it lasted.',
      verified: false },
    { id: 21, productId: 18, name: 'Rekha Y.', avatar: 'RY', date: 'March 2025', rating: 3,
      title: 'Great sound, painful setup',
      body: 'Multi-room setup took far too long and the Sonos app crashed twice during configuration. Once done the audio is great, but the experience needs work.',
      verified: true },
    { id: 22, productId: 19, name: 'Gaurav Z.', avatar: 'GZ', date: 'February 2025', rating: 2,
      title: 'Bass distorts at high volume',
      body: 'At volumes above 80% the bass distorts noticeably. For a premium Bose product this is unacceptable. Midrange is clear and build feels sturdy.',
      verified: true },
    { id: 23, productId: 20, name: 'Ananya A.', avatar: 'AA', date: 'January 2025', rating: 1,
      title: 'Bluetooth drops every few minutes',
      body: 'Frequent Bluetooth disconnections even when the phone is right next to it. Marshall pushed an update but the problem still persists.',
      verified: false },
  ];

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store) {
    this.product$ = store.select(selectSelectedProduct);
    this.loading$ = store.select(selectProductDetailLoading);
    this.related$ = store.select(selectRelatedProducts);
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(p => {
      const id = +p['id'];
      this.store.dispatch(ProductActions.clearSelectedProduct());
      this.store.dispatch(ProductActions.loadProductById({ id }));
      this.selectedImage = 0;
      this.quantity = 1;
    });

    this.product$.pipe(takeUntil(this.destroy$)).subscribe((product: Product | null) => {
      if (product) {
        this.selectedColor = product.colors[0];
        this.store.dispatch(ProductActions.loadRelatedProducts({ product }));
      }
    });
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  selectImage(index: number): void { this.selectedImage = index; }

  selectColor(color: string): void { this.selectedColor = color; }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product, quantity: this.quantity, selectedColor: this.selectedColor }));
  }

  onRelatedAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1, selectedColor: product.colors[0] }));
  }

  getReviewsForProduct(productId: number) {
    return this.mockReviews.filter(r => r.productId === 0 || r.productId === productId);
  }

  getSpecEntries(specs: { [key: string]: string }): { key: string; value: string }[] {
    return Object.entries(specs).map(([key, value]) => ({ key, value }));
  }

  getRatingBars(product: Product) {
    const t = product.reviewCount;
    return [
      { stars: 5, pct: 65, count: Math.round(t * 0.65) },
      { stars: 4, pct: 20, count: Math.round(t * 0.20) },
      { stars: 3, pct: 10, count: Math.round(t * 0.10) },
      { stars: 2, pct: 3,  count: Math.round(t * 0.03) },
      { stars: 1, pct: 2,  count: Math.round(t * 0.02) },
    ];
  }
}
