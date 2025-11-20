import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async fetchProductById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    return response.json();
  },

  async fetchCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};