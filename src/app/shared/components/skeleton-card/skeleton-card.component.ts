import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  template: `
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line long"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      background: var(--gm-bg-card);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--gm-border);
    }
    .skeleton-img {
      width: 100%;
      padding-top: 100%;
      background: linear-gradient(90deg, var(--gm-skeleton-base) 25%, var(--gm-skeleton-shine) 50%, var(--gm-skeleton-base) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .skeleton-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .skeleton-line {
      height: 12px;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--gm-skeleton-base) 25%, var(--gm-skeleton-shine) 50%, var(--gm-skeleton-base) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .skeleton-line.long { width: 90%; }
    .skeleton-line.short { width: 40%; }
    .skeleton-line.medium { width: 60%; }
    .skeleton-btn {
      height: 36px;
      border-radius: 4px;
      margin-top: 8px;
      background: linear-gradient(90deg, var(--gm-skeleton-base) 25%, var(--gm-skeleton-shine) 50%, var(--gm-skeleton-base) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonCardComponent {}
