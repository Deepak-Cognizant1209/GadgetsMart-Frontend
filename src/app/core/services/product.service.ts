import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, PagedResponse, ProductFilter } from '../models';
import { environment } from '../../../environments/environment';

interface BackendProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount_price: number;
  rating: number;
  in_stock: boolean;
  description: string;
  created_at: string;
  colors: string[];
  imageCount: number;
  specifications: { [key: string]: string };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private api = environment.productApiUrl;

  private mapToProduct(dto: BackendProduct): Product {
    return {
      id: dto.id,
      name: dto.name,
      category: dto.category,
      brand: dto.brand,
      price: dto.price,
      discountPrice: dto.discount_price > 0 ? dto.discount_price : undefined,
      rating: dto.rating,
      reviewCount: 0,
      colors: dto.colors ?? [],
      inStock: dto.in_stock,
      description: dto.description,
      images: Array.from({ length: dto.imageCount ?? 0 }, (_, i) => `${this.api}/productImage/${dto.id}/${i}`),
      specs: dto.specifications ?? {}
    };
  }

  private fetchAll(params: ProductFilter): Observable<BackendProduct[]> {
    if (params.search) {
      return this.http.get<BackendProduct[]>(`${this.api}/productSearch/${encodeURIComponent(params.search)}`);
    }
    if (params.category && params.category !== 'All') {
      return this.http.get<BackendProduct[]>(`${this.api}/productCategory/${encodeURIComponent(params.category)}`);
    }
    return this.http.get<BackendProduct[]>(`${this.api}/products`);
  }

  getProducts(params: ProductFilter = {}): Observable<PagedResponse<Product>> {
    return this.fetchAll(params).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return of([] as BackendProduct[]);
        throw err;
      }),
      map(dtos => {
        let products = dtos.map(d => this.mapToProduct(d));

        if (params.brands?.length)
          products = products.filter(p => params.brands!.map(b => b.toLowerCase()).includes(p.brand.toLowerCase()));
        else if (params.brand)
          products = products.filter(p => p.brand.toLowerCase() === params.brand!.toLowerCase());
        if (params.minPrice !== undefined)
          products = products.filter(p => (p.discountPrice ?? p.price) >= params.minPrice!);
        if (params.maxPrice !== undefined)
          products = products.filter(p => (p.discountPrice ?? p.price) <= params.maxPrice!);
        if (params.rating !== undefined)
          products = products.filter(p => p.rating >= params.rating!);
        if (params.colors?.length)
          products = products.filter(p => p.colors.some(c => params.colors!.includes(c)));

        switch (params.sort) {
          case 'price_asc':  products.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)); break;
          case 'price_desc': products.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)); break;
          case 'popularity': products.sort((a, b) => b.reviewCount - a.reviewCount); break;
          case 'newest':     products.sort((a, b) => b.id - a.id); break;
        }

        const page = params.page ?? 0;
        const size = params.size ?? 12;
        const start = page * size;

        return {
          content: products.slice(start, start + size),
          totalElements: products.length,
          totalPages: Math.ceil(products.length / size),
          size,
          number: page
        } as PagedResponse<Product>;
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<BackendProduct>(`${this.api}/product/${id}`).pipe(
      map(dto => this.mapToProduct(dto))
    );
  }

  getRelatedProducts(product: Product): Observable<Product[]> {
    return this.http.get<BackendProduct[]>(`${this.api}/productCategory/${encodeURIComponent(product.category)}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return of([] as BackendProduct[]);
        throw err;
      }),
      map(dtos => dtos
        .map(d => this.mapToProduct(d))
        .filter(p => p.id !== product.id)
        .slice(0, 4)
      )
    );
  }

  getCategories(): Observable<string[]> {
    return of(['Tablets', 'Laptops', 'Mouse', 'Headphones', 'Speakers']);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<BackendProduct[]>(`${this.api}/products`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return of([] as BackendProduct[]);
        throw err;
      }),
      map(dtos => {
        const products = dtos.map(d => this.mapToProduct(d));
        for (let i = products.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [products[i], products[j]] = [products[j], products[i]];
        }
        return products.slice(0, 4);
      })
    );
  }
}
