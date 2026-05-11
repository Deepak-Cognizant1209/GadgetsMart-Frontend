import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-star-rating',
  imports: [],
  template: `
    <div class="stars" [attr.aria-label]="rating + ' out of 5 stars'">
      @for (star of stars; track star) {
        <span class="star" [class.full]="star <= fullStars" [class.half]="star === halfStar">
          {{ star <= fullStars ? '★' : (star === halfStar ? '⯨' : '☆') }}
        </span>
      }
      @if (showCount) {
        <span class="count">({{ count }})</span>
      }
    </div>
  `,
  styles: [`
    .stars { display: inline-flex; align-items: center; gap: 1px; }
    .star { color: #9e9e9e; font-size: 16px; line-height: 1; }
    .star.full, .star.half { color: #ffc107; }
    .count { color: #9e9e9e; font-size: 0.75rem; margin-left: 4px; }
  `]
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() count = 0;
  @Input() showCount = true;

  stars = [1, 2, 3, 4, 5];

  get fullStars(): number { return Math.floor(this.rating); }
  get halfStar(): number | null {
    return (this.rating % 1 >= 0.5) ? Math.ceil(this.rating) : null;
  }
}
