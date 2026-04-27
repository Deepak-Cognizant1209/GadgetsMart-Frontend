import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <span class="material-icons icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      @if (ctaLabel) {
        <button class="cta-btn" (click)="ctaClick.emit()">{{ ctaLabel }}</button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 24px;
      text-align: center;
      gap: 12px;
    }
    .icon { font-size: 64px; color: var(--gm-text-sub); }
    h3 { font-size: 1.25rem; color: var(--gm-text); margin: 0; }
    p { color: var(--gm-text-sub); margin: 0; }
    .cta-btn {
      margin-top: 8px;
      padding: 10px 24px;
      background: #00bcd4;
      color: #1a1a1a;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }
    .cta-btn:hover { background: #00acc1; }
  `]
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Nothing here';
  @Input() message = '';
  @Input() ctaLabel = '';
  @Output() ctaClick = new EventEmitter<void>();
}
