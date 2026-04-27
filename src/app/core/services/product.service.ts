import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, PagedResponse, ProductFilter } from '../models';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../mock/mock-products';

// Swap each method body for an HttpClient call when the Spring Boot backend is ready.
// Endpoint reference:  GET /api/products | GET /api/products/{id} | GET /api/products/{id}/related
//                      GET /api/products/featured | GET /api/products/categories

@Injectable({ providedIn: 'root' })
export class ProductService {

  getProducts(params: ProductFilter = {}): Observable<PagedResponse<Product>> {
    let filtered = [...MOCK_PRODUCTS];

    if (params.category)
      filtered = filtered.filter(p => p.category.toLowerCase() === params.category!.toLowerCase());
    if (params.brands?.length)
      filtered = filtered.filter(p => params.brands!.map(b => b.toLowerCase()).includes(p.brand.toLowerCase()));
    else if (params.brand)
      filtered = filtered.filter(p => p.brand.toLowerCase() === params.brand!.toLowerCase());
    if (params.minPrice !== undefined)
      filtered = filtered.filter(p => (p.discountPrice ?? p.price) >= params.minPrice!);
    if (params.maxPrice !== undefined)
      filtered = filtered.filter(p => (p.discountPrice ?? p.price) <= params.maxPrice!);
    if (params.rating !== undefined)
      filtered = filtered.filter(p => p.rating >= params.rating!);
    if (params.colors?.length)
      filtered = filtered.filter(p => p.colors.some(c => params.colors!.includes(c)));
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (params.sort) {
      case 'price_asc':  filtered.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)); break;
      case 'price_desc': filtered.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)); break;
      case 'popularity': filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'newest':     filtered.sort((a, b) => b.id - a.id); break;
    }

    const page = params.page ?? 0;
    const size = params.size ?? 12;
    const start = page * size;

    return of<PagedResponse<Product>>({
      content: filtered.slice(start, start + size),
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      size,
      number: page
    });
  }

  getProductById(id: number): Observable<Product> {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error(`Product ${id} not found`);
    return of(product);
  }

  getRelatedProducts(product: Product): Observable<Product[]> {
    return of(
      MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    );
  }

  getCategories(): Observable<string[]> {
    return of(MOCK_CATEGORIES);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of([...MOCK_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8));
  }
}
