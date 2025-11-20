import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Search, X, Heart } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { selectCartTotalCount } from '../store/cartSlice';
import { selectWishlistItems } from '../store/wishlistSlice';
import { setSearchTerm } from '../store/productSlice';

const Navbar: React.FC = () => {
  const cartCount = useAppSelector(selectCartTotalCount);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearchTerm(value));
    
    if (value && location.pathname !== '/') {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors flex-shrink-0"
          onClick={clearSearch}
        >
          <ShoppingBag className="h-8 w-8" />
          <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">TechSurvi</span>
        </Link>

        <div className="flex-grow max-w-md relative hidden xs:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            {searchValue && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link 
            to="/wishlist" 
            className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-full transition-all group"
            title="Wishlist"
          >
            <Heart className="h-6 w-6" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 block h-2.5 w-2.5 bg-brand-500 rounded-full ring-2 ring-white"></span>
            )}
          </Link>

          <Link 
            to="/cart" 
            className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-full transition-all group"
            title="Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white min-w-[1.25rem]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      {/* Mobile Search */}
      <div className="container mx-auto px-4 pb-3 xs:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full py-2 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;