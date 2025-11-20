import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} TechSurvi Store. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;