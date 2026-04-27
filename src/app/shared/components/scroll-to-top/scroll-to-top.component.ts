import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    <button
      class="stt-btn"
      [class.visible]="isVisible"
      (click)="scrollToTop()"
      aria-label="Scroll to top"
    >
      <span class="material-icons">keyboard_arrow_up</span>
    </button>
  `,
  styles: [`
    .stt-btn {
      position: fixed;
      bottom: 32px;
      right: 28px;
      z-index: 999;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid var(--gm-border);
      background: var(--gm-bg-elevated);
      color: var(--gm-text-sub);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--gm-shadow-card);
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease,
                  background 0.2s, color 0.2s, border-color 0.2s;
    }

    .stt-btn.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .stt-btn:hover {
      background: #00bcd4;
      color: #fff;
      border-color: #00bcd4;
    }

    .stt-btn:active {
      transform: scale(0.93);
    }

    .stt-btn .material-icons {
      font-size: 22px;
    }

    @media (max-width: 767px) {
      .stt-btn { bottom: 22px; right: 18px; }
    }
  `]
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
