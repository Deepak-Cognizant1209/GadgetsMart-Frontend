import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-input',
  template: `
    <div class="qty-wrapper">
      <button class="qty-btn" (click)="decrement()" [disabled]="value <= min">−</button>
      <input class="qty-input" type="number" [value]="value" [min]="min" [max]="max"
             (change)="onInputChange($event)" readonly />
      <button class="qty-btn" (click)="increment()" [disabled]="value >= max">+</button>
    </div>
  `,
  styles: [`
    .qty-wrapper { display: inline-flex; align-items: center; border: 1px solid var(--gm-border); border-radius: 4px; overflow: hidden; }
    .qty-btn {
      width: 32px; height: 36px; background: var(--gm-bg-elevated); color: var(--gm-text); border: none;
      font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: filter 0.15s;
    }
    .qty-btn:hover:not(:disabled) { filter: brightness(1.15); }
    .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .qty-input {
      width: 48px; height: 36px; background: var(--gm-bg-card); color: var(--gm-text); border: none;
      text-align: center; font-size: 0.875rem;
      -moz-appearance: textfield;
    }
    .qty-input::-webkit-inner-spin-button, .qty-input::-webkit-outer-spin-button { display: none; }
  `]
})
export class QuantityInputComponent {
  @Input() value = 1;
  @Input() min = 1;
  @Input() max = 10;
  @Output() valueChange = new EventEmitter<number>();

  increment(): void {
    if (this.value < this.max) this.valueChange.emit(this.value + 1);
  }

  decrement(): void {
    if (this.value > this.min) this.valueChange.emit(this.value - 1);
  }

  onInputChange(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    if (!isNaN(val)) this.valueChange.emit(Math.min(this.max, Math.max(this.min, val)));
  }
}
