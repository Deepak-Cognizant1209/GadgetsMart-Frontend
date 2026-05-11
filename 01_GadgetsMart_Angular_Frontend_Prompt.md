# 🛒 Angular E-Commerce Frontend Prompt — Gadgets Mart
### Reference Site: https://advantageonlineshopping.com/#/

---

> **Paste this entire prompt into a new Claude conversation to start building.**

---

You are an expert Angular frontend developer. I need you to build a production-grade
e-commerce web application called **Gadgets Mart** frontend that replicates the look, feel, and functionality
of https://advantageonlineshopping.com/#/

## 🎨 Design Reference

The site uses:
- Dark theme (near-black background `#1a1a1a`, dark navy `#1d3557`)
- Bright accent colors: cyan/teal (`#00bcd4`) and orange (`#ff6600`) for CTAs
- Clean sans-serif typography (use **Roboto** from Google Fonts)
- Card-based product grid layout
- Sticky top navbar with cart icon, user account dropdown, and search
- Collapsible sidebar for category filtering
- Hero banner with promotions/featured products

---

## 🛠 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Angular 17+ (Standalone Components) |
| Language     | TypeScript (strict mode)            |
| Styling      | SCSS + Angular Material             |
| State        | NgRx (Store + Effects + Selectors)  |
| HTTP         | Angular HttpClient                  |
| Forms        | Reactive Forms                      |
| Routing      | Angular Router with Guards          |
| Notifications| Angular Material Snackbar           |
| Build Tool   | Angular CLI                         |

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # AuthGuard, GuestGuard
│   │   ├── interceptors/    # JwtInterceptor, ErrorInterceptor
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # ProductService, AuthService, CartService, OrderService
│   ├── shared/
│   │   ├── components/      # Navbar, Footer, ProductCard, Skeleton, StarRating
│   │   └── pipes/           # CurrencyFormat, TruncateText
│   ├── store/
│   │   ├── cart/            # cart.actions, cart.reducer, cart.effects, cart.selectors
│   │   ├── auth/            # auth.actions, auth.reducer, auth.effects, auth.selectors
│   │   └── product/         # product.actions, product.reducer, product.effects
│   ├── features/
│   │   ├── home/
│   │   ├── category/
│   │   ├── product-detail/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── auth/            # login, register
│   │   ├── account/
│   │   └── order-confirmation/
│   └── app.routes.ts
├── assets/
│   └── images/
├── environments/
│   ├── environment.ts        # { apiUrl: 'http://localhost:8080/api' }
│   └── environment.prod.ts
└── styles/
    ├── _variables.scss       # Color tokens, spacing, breakpoints
    ├── _mixins.scss
    └── styles.scss
```

---

## 🗂 Data Models (`src/app/core/models/`)

```typescript
// product.model.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  colors: string[];
  inStock: boolean;
  description: string;
  specs: { [key: string]: string };
}

// cart.model.ts
export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// order.model.ts
export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  color: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  tax: number;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

---

## 🔌 API Service Layer (`src/app/core/services/`)

Create services that connect to `http://localhost:8080/api`.
**Use mock data for now** — the real Spring Boot backend will replace it later.

```typescript
// product.service.ts — methods needed:
getProducts(params?: { category?: string; brand?: string; minPrice?: number; maxPrice?: number; sort?: string; page?: number; size?: number }): Observable<PagedResponse<Product>>
getProductById(id: number): Observable<Product>
getCategories(): Observable<string[]>

// auth.service.ts — methods needed:
login(req: LoginRequest): Observable<AuthResponse>
register(req: RegisterRequest): Observable<AuthResponse>
logout(): void
getCurrentUser(): User | null
isLoggedIn(): boolean

// cart.service.ts — methods needed:
getCart(): Observable<Cart>
addToCart(productId: number, quantity: number, color: string): Observable<Cart>
updateCartItem(productId: number, quantity: number): Observable<Cart>
removeFromCart(productId: number): Observable<Cart>
clearCart(): Observable<void>

// order.service.ts — methods needed:
placeOrder(orderData: PlaceOrderRequest): Observable<Order>
getMyOrders(): Observable<Order[]>
getOrderById(id: number): Observable<Order>
```

```typescript
// Shared response wrapper
export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
```

---

## 🔐 Auth Interceptor

Create `JwtInterceptor` that:
- Reads JWT token from `localStorage` (key: `"auth_token"`)
- Attaches `Authorization: Bearer <token>` header to every outgoing request
- On `401` response → dispatches logout action and redirects to `/login`

Create `ErrorInterceptor` that:
- On `500` → shows a snackbar: "Server error. Please try again."
- On `404` → shows snackbar: "Resource not found."

---

## 📄 Pages to Build

### 1. 🏠 Home Page (`/`)
- Hero banner carousel (3 slides, auto-advance every 4s, manual dots)
- "Shop by Category" section: Tablets, Laptops, Mice, Headphones, Speakers (icon cards)
- Featured Products grid (8 products using `<app-product-card>`)
- Promotional banners (2-column layout)
- "Special Offers" horizontal scroll row

### 2. 📦 Category Page (`/category/:categoryName`)
- Left sidebar (collapsible on mobile):
  - Price range slider (Angular Material)
  - Brand checkboxes
  - Color swatches
  - Star rating filter
- Product grid (3–4 columns, responsive)
- Sort dropdown (Price: Low→High, High→Low, Popularity, Newest)
- Pagination (Angular Material paginator)
- Empty state when no products match filters

### 3. 🔍 Product Detail Page (`/product/:id`)
- Image gallery: main image + thumbnail strip (click to switch)
- Product name, SKU, brand, price (with strikethrough if discounted), availability badge
- Color selector (clickable swatches)
- Quantity stepper (min 1, max 10)
- "Add to Cart" + "Add to Wishlist" buttons
- Tabs (Angular Material): Description | Specifications | Reviews
- Related products carousel (4 cards, horizontal scroll)

### 4. 🛒 Shopping Cart (`/cart`)
- Line items table: product image, name, color, qty stepper, unit price, line total
- Remove item button (with confirm snackbar + undo)
- Empty cart state with "Start Shopping" CTA
- Order summary panel: subtotal, estimated tax (10%), total
- "Proceed to Checkout" button (guarded — must be logged in)
- "Continue Shopping" link

### 5. 💳 Checkout (`/checkout`) — Auth-Guarded
- 3-step stepper (Angular Material):
  - **Step 1 — Shipping**: Full name, street, city, state, ZIP, country (Reactive Form + validators)
  - **Step 2 — Payment**: Card number, expiry (MM/YY), CVV — UI only, no real processing
  - **Step 3 — Review**: Order summary + "Place Order" button
- On success → navigate to `/order-confirmation/:orderId`

### 6. ✅ Order Confirmation (`/order-confirmation/:orderId`)
- Animated checkmark (CSS animation)
- Order ID, items list, shipping address, estimated delivery (today + 5 days)
- "Track Order" + "Continue Shopping" buttons

### 7. 👤 Auth Pages
- `/login` — Email + password, "Remember Me" checkbox, link to register, forgot password link
- `/register` — Name, email, password, confirm password with strength indicator

### 8. 🧾 My Account (`/account`) — Auth-Guarded
- Tabs: Profile | Orders | Addresses
- **Profile tab**: Edit name/email/password form
- **Orders tab**: Table of past orders with status badge, clickable rows for detail
- **Addresses tab**: Saved addresses list with add/edit/delete

### 9. 🔍 Search Results (`/search?q=...`)
- Triggered from navbar search bar
- Reuses the same product grid + filter sidebar from Category page

---

## 🧩 Shared Components (`src/app/shared/components/`)

```
app-navbar          — sticky top bar with "Gadgets Mart" logo, search, cart badge, user menu
app-footer          — links, copyright "© 2025 Gadgets Mart"
app-product-card    — image, name, price, rating, add-to-cart button
app-star-rating     — displays 1–5 stars (input: rating: number)
app-skeleton-card   — loading placeholder matching product card dimensions
app-breadcrumb      — dynamic breadcrumb from router
app-quantity-input  — stepper with + / - buttons and input
app-empty-state     — icon + message + optional CTA button
```

---

## 🗃 NgRx Store Structure

```
store/
├── cart/
│   ├── cart.actions.ts      # addItem, removeItem, updateQuantity, clearCart, loadCart
│   ├── cart.reducer.ts
│   ├── cart.effects.ts      # API calls
│   └── cart.selectors.ts    # selectCartItems, selectCartTotal, selectCartCount
├── auth/
│   ├── auth.actions.ts      # login, loginSuccess, loginFailure, logout, loadUser
│   ├── auth.reducer.ts
│   ├── auth.effects.ts
│   └── auth.selectors.ts    # selectCurrentUser, selectIsLoggedIn, selectAuthLoading
└── product/
    ├── product.actions.ts   # loadProducts, loadProductById, setFilters
    ├── product.reducer.ts
    ├── product.effects.ts
    └── product.selectors.ts # selectProducts, selectSelectedProduct, selectLoading
```

---

## 📦 Mock Data (`src/app/core/mock/mock-products.ts`)

Create **20 products** across 5 categories (4 each):
- **Tablets**: iPad Pro 12.9", Samsung Galaxy Tab S9, Microsoft Surface Pro, Lenovo Tab P12
- **Laptops**: MacBook Pro 14", Dell XPS 15, HP Spectre x360, ASUS ZenBook 14
- **Mice**: Logitech MX Master 3, Razer DeathAdder V3, Apple Magic Mouse, Microsoft Arc Mouse
- **Headphones**: Sony WH-1000XM5, Bose QC45, AirPods Max, Sennheiser HD 560S
- **Speakers**: JBL Flip 6, Sonos One, Bose SoundLink, Marshall Stanmore III

Each product must have:
- Realistic prices ($25–$1,500)
- Rating between 3.5–5.0
- 2–4 color options
- Placeholder images from `https://picsum.photos/seed/{productId}/400/400`

---

## ✅ Quality Requirements

- Fully **responsive** (mobile-first; breakpoints: 576px, 768px, 992px, 1200px)
- **Lazy loading** for all feature modules
- **Skeleton loaders** while products are loading
- **Form validation** with meaningful error messages on all forms
- **Route Guards**: `AuthGuard` blocks `/checkout`, `/account`; `GuestGuard` blocks `/login`, `/register` when already logged in
- **404 page** with navigation back to home
- Angular Material **dark theme** applied globally
- No TypeScript errors, no `any` types unless unavoidable

---

## 🚀 Build Order

Build in this exact order and confirm with me before moving to the next step:

1. [ ] Project setup: `ng new gadgets-mart --routing --style=scss`, install NgRx, Angular Material
2. [ ] Folder structure, models, environment files
3. [ ] Mock data + service layer (returning mock observables)
4. [ ] NgRx store setup (cart + auth + product)
5. [ ] Shared components: Navbar ("Gadgets Mart" branding), Footer, ProductCard, Skeleton
6. [ ] Home page
7. [ ] Category page with filters
8. [ ] Product Detail page
9. [ ] Cart page
10. [ ] Auth pages (Login + Register)
11. [ ] Checkout (3-step stepper)
12. [ ] Order Confirmation page
13. [ ] My Account page
14. [ ] Search Results page
15. [ ] Route Guards + Interceptors
16. [ ] Final polish: animations, 404 page, accessibility

---

> ✅ Once frontend is complete, the next step is integrating with a **Spring Boot + MySQL backend**.
> The API base URL is pre-configured in `environment.ts` as `http://localhost:8080/api`.
> All service methods are already structured to match the REST endpoints defined in the backend prompt.
