import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="page-content" style="text-align:center;padding:64px 16px">
      <h1 style="font-size:6rem;margin:0;color:#00bcd4">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/" style="color:#00bcd4">Back to Home</a>
    </div>
  `
})
export class NotFoundComponent {}
