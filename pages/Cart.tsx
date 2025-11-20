import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { 
  selectCartItems, 
  selectCartTotalPrice, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from '../store/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-slate-100 p-6 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our products to find something you love.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors inline-flex items-center"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 sm:gap-6 items-center"
            >
              <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg border border-slate-100 p-2">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-grow min-w-0">
                <Link 
                  to={`/product/${item.id}`}
                  className="text-slate-900 font-medium hover:text-brand-600 transition-colors line-clamp-2 mb-1"
                >
                  {item.title}
                </Link>
                <p className="text-slate-500 text-sm mb-2 capitalize">{item.category}</p>
                <p className="text-brand-600 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                  {item.quantity > 1 && (
                    <span className="text-slate-400 font-normal text-xs ml-2">
                      (${item.price.toFixed(2)} each)
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4 text-slate-600" />
                  </button>
                  <span className="font-semibold text-slate-900 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (Estimated)</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-brand-600">
                  ${(totalPrice * 1.08).toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
              Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;