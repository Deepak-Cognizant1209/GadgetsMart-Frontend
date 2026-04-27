import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { selectCartCount } from '../../../store/cart/cart.selectors';
import { CartActions } from '../../../store/cart/cart.actions';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, MatIconModule, MatMenuModule, MatButtonModule, FormsModule],
  template: `
    <nav class="navbar">
      <div class="navbar-inner">

        <!-- Logo -->
        <a class="logo" routerLink="/">
          <div class="logo-icon-wrap">
            <span class="material-icons logo-icon">devices</span>
          </div>
          <span class="logo-text">Gadgets<span class="logo-accent">Mart</span></span>
        </a>

        <!-- Search -->
        <div class="search-bar">
          <span class="material-icons search-icon">search</span>
          <input type="text" placeholder="Search products, brands..."
                 [(ngModel)]="searchQuery"
                 (keydown.enter)="onSearch()"
                 class="search-input" />
          @if (searchQuery) {
            <button class="clear-btn" (click)="searchQuery = ''; onSearch()">
              <span class="material-icons">close</span>
            </button>
          }
          <button class="search-go-btn" (click)="onSearch()">Search</button>
        </div>

        <!-- Actions -->
        <div class="nav-actions">

          <button class="icon-btn theme-btn" (click)="theme.toggle()"
                  [title]="theme.isDark ? 'Light Mode' : 'Dark Mode'" aria-label="Toggle theme">
            <span class="material-icons">{{ theme.isDark ? 'light_mode' : 'dark_mode' }}</span>
          </button>

          <a routerLink="/cart" class="icon-btn cart-btn" aria-label="Cart">
            <span class="cart-icon-wrap">
              <span class="material-icons">shopping_cart</span>
              @if ((cartCount$ | async) ?? 0; as count) {
                @if (count > 0) {
                  <span class="cart-count">{{ count }}</span>
                }
              }
            </span>
          </a>

          <div class="nav-divider"></div>

          <a routerLink="/login" class="auth-btn">Login</a>
          <a routerLink="/register" class="auth-btn primary">Sign Up</a>
        </div>

        <button class="mobile-menu-btn" (click)="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>

      @if (mobileMenuOpen) {
        <div class="mobile-menu">
          <div class="mobile-search">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search products..."
                   [(ngModel)]="searchQuery"
                   (keydown.enter)="onSearch(); mobileMenuOpen = false" />
          </div>
          <div class="mobile-nav-links">
            <a routerLink="/" class="mobile-link" (click)="mobileMenuOpen = false">
              <span class="material-icons">home</span>Home
            </a>
            <a routerLink="/cart" class="mobile-link" (click)="mobileMenuOpen = false">
              <span class="material-icons">shopping_cart</span>
              Cart
              @if ((cartCount$ | async) ?? 0; as count) {
                @if (count > 0) { <span class="mobile-badge">{{ count }}</span> }
              }
            </a>
          </div>
          <div class="mobile-footer">
            <a routerLink="/login" class="mobile-auth-btn" (click)="mobileMenuOpen = false">Login</a>
            <a routerLink="/register" class="mobile-auth-btn primary" (click)="mobileMenuOpen = false">Sign Up</a>
          </div>
        </div>
      }
    </nav>
  `,
  styles: [`
    /* ── Shell ── */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: var(--gm-navbar-bg);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--gm-border-soft);
      box-shadow: 0 4px 40px var(--gm-shadow);
    }
    .navbar-inner {
      max-width: 1440px; margin: 0 auto; padding: 0 36px;
      height: 76px; display: flex; align-items: center; gap: 24px;
    }

    /* ── Logo ── */
    .logo {
      display: flex; align-items: center; gap: 12px;
      text-decoration: none; flex-shrink: 0; user-select: none;
    }
    .logo-icon-wrap {
      width: 42px; height: 42px; border-radius: 12px;
      background: linear-gradient(135deg, #00bcd4 0%, #0088a3 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 0 1px rgba(0,188,212,0.3), 0 4px 16px rgba(0,188,212,0.3);
      flex-shrink: 0;
    }
    .logo-icon { color: #fff; font-size: 22px; }
    .logo-text {
      font-size: 1.4rem; font-weight: 800; color: var(--gm-text);
      white-space: nowrap; letter-spacing: -0.5px; line-height: 1;
    }
    .logo-accent { color: #00bcd4; }

    /* ── Search ── */
    .search-bar {
      flex: 1; max-width: 600px; display: flex; align-items: center;
      margin-left:8vh;
      background: var(--gm-input-bg);
      border: 1.5px solid var(--gm-border);
      border-radius: 14px; padding: 0 6px 0 16px; height: 46px;
      transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    }
    .search-bar:focus-within {
      border-color: rgba(0,188,212,0.5);
      box-shadow: 0 0 0 3px rgba(0,188,212,0.08);
    }
    .search-icon {
      color: var(--gm-text-muted); font-size: 20px;
      margin-right: 6px; flex-shrink: 0;
    }
    .search-input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--gm-text); font-size: 0.9rem; padding: 0 6px;
    }
    .search-input::placeholder { color: var(--gm-text-muted); }
    .clear-btn {
      background: none; border: none; color: var(--gm-text-muted);
      cursor: pointer; display: flex; align-items: center;
      padding: 6px; border-radius: 6px; flex-shrink: 0; transition: color 0.15s;
    }
    .clear-btn:hover { color: var(--gm-text); }
    .clear-btn .material-icons { font-size: 16px; }
    .search-go-btn {
      background: linear-gradient(135deg, #00bcd4, #0097a7);
      border: none; color: #000; font-size: 0.82rem; font-weight: 700;
      padding: 0 18px; height: 36px; border-radius: 10px; cursor: pointer;
      white-space: nowrap; letter-spacing: 0.3px; flex-shrink: 0;
      transition: opacity 0.15s, transform 0.1s;
    }
    .search-go-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .search-go-btn:active { transform: translateY(0); }

    /* ── Actions strip ── */
    .nav-actions {
      display: flex; align-items: center; gap: 6px;
      margin-left: auto; flex-shrink: 0;
    }
    .nav-divider {
      width: 1px; height: 28px;
      background: var(--gm-border-soft);
      margin: 0 8px;
    }

    /* ── Icon buttons ── */
    .icon-btn {
      width: 42px; height: 42px; border-radius: 10px;
      background: none; border: none; color: var(--gm-text-sub); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; transition: all 0.18s; flex-shrink: 0;
    }
    .icon-btn:hover {
      color: #00bcd4; background: rgba(0,188,212,0.1);
    }
    .icon-btn .material-icons { font-size: 23px; }
    .theme-btn { transition: color 0.18s, background 0.18s, transform 0.3s; }
    .theme-btn:hover { transform: rotate(22deg); }

    .cart-icon-wrap { position: relative; display: inline-flex; }
    .cart-count {
      position: absolute; top: -5px; right: -7px;
      background: #f44336; color: #fff;
      font-size: 0.6rem; font-weight: 800; line-height: 1;
      min-width: 17px; height: 17px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center; padding: 0 3px;
      border: 1.5px solid var(--gm-navbar-bg);
    }

    /* ── User pill ── */
    .user-btn {
      display: flex; align-items: center; gap: 8px;
      background: var(--gm-input-bg);
      border: 1.5px solid var(--gm-border);
      color: var(--gm-text); cursor: pointer;
      padding: 5px 12px 5px 6px; border-radius: 28px;
      transition: all 0.18s; height: 42px;
    }
    .user-btn:hover {
      background: rgba(0,188,212,0.1);
      border-color: rgba(0,188,212,0.3);
    }
    .user-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      background: linear-gradient(135deg, #00bcd4, #0088a3);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; color: #fff; flex-shrink: 0;
    }
    .user-name { font-size: 0.85rem; font-weight: 500; }
    .chevron { font-size: 17px !important; color: var(--gm-text-muted); }

    /* ── Auth buttons ── */
    .auth-btn {
      padding: 9px 18px; border-radius: 10px;
      font-size: 0.85rem; font-weight: 500;
      text-decoration: none; white-space: nowrap;
      transition: all 0.18s; color: var(--gm-text-sub);
      border: 1.5px solid var(--gm-border);
      background: transparent; height: 42px;
      display: flex; align-items: center;
    }
    .auth-btn:hover {
      color: var(--gm-text); background: var(--gm-hover-bg);
      border-color: var(--gm-border-soft);
    }
    .auth-btn.primary {
      background: linear-gradient(135deg, #00bcd4, #0097a7);
      color: #000; font-weight: 700; border-color: transparent;
      box-shadow: 0 2px 12px rgba(0,188,212,0.3);
    }
    .auth-btn.primary:hover {
      box-shadow: 0 4px 20px rgba(0,188,212,0.45);
      transform: translateY(-1px); color: #000;
    }
    .auth-btn.primary:active { transform: translateY(0); }

    /* ── Mobile toggle ── */
    .mobile-menu-btn {
      display: none;
      width: 42px; height: 42px; border-radius: 10px;
      background: var(--gm-input-bg);
      border: 1.5px solid var(--gm-border);
      color: var(--gm-text-sub); cursor: pointer;
      align-items: center; justify-content: center;
      transition: background 0.18s;
    }
    .mobile-menu-btn:hover { background: var(--gm-hover-bg); color: var(--gm-text); }
    .mobile-menu-btn .material-icons { font-size: 22px; }

    /* ── Mobile menu ── */
    .mobile-menu {
      background: var(--gm-navbar-bg);
      border-top: 1px solid var(--gm-border-soft);
      padding: 20px 20px 16px; display: flex; flex-direction: column; gap: 6px;
    }
    .mobile-search {
      display: flex; align-items: center; gap: 10px;
      background: var(--gm-input-bg);
      border: 1.5px solid var(--gm-border);
      border-radius: 12px; padding: 10px 14px; margin-bottom: 12px;
    }
    .mobile-search .material-icons { color: var(--gm-text-muted); font-size: 18px; }
    .mobile-search input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--gm-text); font-size: 0.9rem;
    }
    .mobile-search input::placeholder { color: var(--gm-text-muted); }

    .mobile-nav-links { display: flex; flex-direction: column; gap: 2px; }
    .mobile-link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 14px; color: var(--gm-text-sub);
      text-decoration: none; font-size: 0.92rem; font-weight: 500;
      border-radius: 10px; transition: all 0.15s;
    }
    .mobile-link .material-icons { font-size: 19px; color: #00bcd4; opacity: 0.85; }
    .mobile-link:hover { background: var(--gm-hover-bg); color: var(--gm-text); }
    .mobile-badge {
      margin-left: auto; background: #f44336; color: #fff;
      font-size: 0.65rem; font-weight: 700; min-width: 19px; height: 19px;
      border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
    }

    .mobile-footer {
      display: flex; gap: 10px; margin-top: 12px; padding-top: 14px;
      border-top: 1px solid var(--gm-border-soft);
    }
    .mobile-auth-btn {
      flex: 1; text-align: center; padding: 11px 12px; border-radius: 10px;
      font-size: 0.875rem; font-weight: 600; text-decoration: none; cursor: pointer;
      border: 1.5px solid var(--gm-border); color: var(--gm-text-sub);
      background: transparent; transition: all 0.15s;
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .mobile-auth-btn:hover { background: var(--gm-hover-bg); color: var(--gm-text); }
    .mobile-auth-btn .material-icons { font-size: 16px; }
    .mobile-auth-btn.primary {
      background: linear-gradient(135deg, #00bcd4, #0097a7);
      border-color: transparent; color: #000; font-weight: 700;
    }
    .mobile-auth-btn.primary:hover { opacity: 0.9; color: #000; }
    .mobile-auth-btn.danger { border-color: rgba(229,57,53,0.3); color: #ef5350; }
    .mobile-auth-btn.danger:hover { background: rgba(229,57,53,0.08); }

    /* ── Breakpoints ── */
    @media (max-width: 900px) {
      .search-go-btn { display: none; }
    }
    @media (max-width: 767px) {
      .navbar-inner { padding: 0 16px; gap: 12px; height: 68px; }
      .nav-actions .auth-btn { display: none; }
      .nav-actions .nav-divider { display: none; }
      .user-btn { display: none; }
      .mobile-menu-btn { display: flex; }
      .search-bar { max-width: none; border-radius: 12px; height: 42px; }
    }
    @media (max-width: 480px) {
      .logo-text { display: none; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  cartCount$: Observable<number>;
  searchQuery = '';
  mobileMenuOpen = false;

  constructor(private store: Store, private router: Router, public theme: ThemeService) {
    this.cartCount$ = this.store.select(selectCartCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
