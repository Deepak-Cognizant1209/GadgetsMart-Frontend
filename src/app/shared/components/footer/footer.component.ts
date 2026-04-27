import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">

        <!-- Brand -->
        <div class="footer-brand">
          <a routerLink="/" class="brand-logo">
            <div class="brand-icon"><span class="material-icons">devices</span></div>
            <span class="brand-name">Gadgets<span class="accent">Mart</span></span>
          </a>
          <p>Your one-stop shop for the latest tech gadgets at the best prices.</p>
        </div>

        <!-- Links -->
        <div class="footer-links">
          <div class="link-group">
            <h4>Shop</h4>
            <a routerLink="/category/Tablets">Tablets</a>
            <a routerLink="/category/Laptops">Laptops</a>
            <a routerLink="/category/Mouse">Mouse</a>
            <a routerLink="/category/Headphones">Headphones</a>
            <a routerLink="/category/Speakers">Speakers</a>
          </div>
          <div class="link-group">
            <h4>Account</h4>
            <a routerLink="/account">My Profile</a>
            <a routerLink="/account">My Orders</a>
            <a routerLink="/cart">My Cart</a>
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Register</a>
          </div>
          <div class="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Returns & Refunds</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2025 Gadgets Mart. All rights reserved.</span>
        <div class="bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a routerLink="/" fragment="contact-us">Contact</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--gm-bg-secondary);
      color: var(--gm-text-sub);
      margin-top: auto;
      border-top: 1px solid var(--gm-border-soft);
    }
    .footer-inner {
      max-width: 1400px; margin: 0 auto;
      padding: 52px 32px 36px;
      display: flex; gap: 64px; flex-wrap: wrap;
    }

    /* Brand */
    .footer-brand { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 14px; }
    .brand-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .brand-icon {
      width: 36px; height: 36px; border-radius: 9px;
      background: linear-gradient(135deg, #00bcd4, #0097a7);
      display: flex; align-items: center; justify-content: center;
    }
    .brand-icon .material-icons { color: #fff; font-size: 20px; }
    .brand-name { font-size: 1.2rem; font-weight: 800; color: var(--gm-text); letter-spacing: -0.3px; }
    .accent { color: #00bcd4; }
    .footer-brand p { font-size: 0.84rem; line-height: 1.7; margin: 0; max-width: 240px; color: var(--gm-text-sub); }

    /* Links */
    .footer-links { display: flex; gap: 48px; flex-wrap: wrap; flex: 2; }
    .link-group { display: flex; flex-direction: column; gap: 10px; min-width: 110px; }
    .link-group h4 {
      color: var(--gm-text); margin: 0 0 6px; font-size: 0.85rem;
      font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;
    }
    .link-group a {
      color: var(--gm-text-sub); text-decoration: none; font-size: 0.84rem;
      transition: color 0.15s; width: fit-content;
    }
    .link-group a:hover { color: #00bcd4; }

    /* Bottom bar */
    .footer-bottom {
      border-top: 1px solid var(--gm-border-soft);
      padding: 16px 32px;
      max-width: 1400px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.8rem; color: var(--gm-text-muted); flex-wrap: wrap; gap: 8px;
    }
    .bottom-links { display: flex; gap: 20px; }
    .bottom-links a { color: var(--gm-text-muted); text-decoration: none; transition: color 0.15s; }
    .bottom-links a:hover { color: #00bcd4; }

    @media (max-width: 767px) {
      .footer-inner { padding: 36px 20px 24px; gap: 36px; }
      .footer-links { gap: 28px; }
      .footer-bottom { padding: 14px 20px; flex-direction: column; text-align: center; }
    }
  `]
})
export class FooterComponent {}
