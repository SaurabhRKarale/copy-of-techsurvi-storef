import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, WishlistState } from '../types';

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectIsInWishlist = (state: { wishlist: WishlistState }, productId: number) => 
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;