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

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'popularity' | 'newest';
  page?: number;
  size?: number;
  rating?: number;
  colors?: string[];
  search?: string;
}
