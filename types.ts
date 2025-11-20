export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface ProductsState {
  items: Product[];
  status: FetchStatus;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  searchTerm: string;
  sortOption: SortOption;
}

export interface CartState {
  items: CartItem[];
}

export interface WishlistState {
  items: Product[];
}