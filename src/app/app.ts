import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  template: `
    <app-navbar />
    <main class="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    .main-content { flex: 1; padding-top: 76px; }
  `]
})
export class App implements OnInit {
  ngOnInit(): void {
    this.setFavicon();
  }

  private setFavicon(): void {
    document.querySelectorAll('link[rel*="icon"]').forEach(el => el.remove());

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00bcd4"/>
          <stop offset="100%" stop-color="#0097a7"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#g)"/>
      <g transform="translate(8,8) scale(1.333)" fill="white">
        <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7zm-3 6h-4v2h10v-2h-4v-2h-2v2z"/>
      </g>
    </svg>`;

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    document.head.appendChild(link);
  }
}
