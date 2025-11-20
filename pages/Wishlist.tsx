import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useAppSelector } from '../store/store';
import { selectWishlistItems } from '../store/wishlistSlice';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const wishlistItems = useAppSelector(selectWishlistItems);

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-slate-100 p-6 rounded-full mb-6">
          <Heart className="h-16 w-16 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          Save items you want to see later. Start browsing and add your favorite products.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors inline-flex items-center"
        >
          Browse Products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">My Wishlist</h1>
      <p className="text-slate-500 mb-8">{wishlistItems.length} items saved</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;