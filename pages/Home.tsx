import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProducts, fetchCategories, setSelectedCategory, setSortOption, setSearchTerm } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { Loader2, AlertCircle, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { SortOption } from '../types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, categories, selectedCategory, searchTerm, sortOption } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortOption]);

  const processedProducts = useMemo(() => {
    let result = [...items];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        p.description.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // keep original order
        break;
    }

    return result;
  }, [items, selectedCategory, searchTerm, sortOption]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  
  const currentProducts = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-brand-500 mb-4" />
        <p className="text-slate-500 font-medium">Loading products...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-600 max-w-md">{error}</p>
        <button 
          onClick={() => dispatch(fetchProducts())}
          className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {searchTerm ? `Results for "${searchTerm}"` : "New Arrivals"}
            </h1>
            <p className="text-slate-500">
              {processedProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative flex items-center">
              <SlidersHorizontal className="absolute left-3 h-4 w-4 text-slate-500" />
              <select
                value={sortOption}
                onChange={(e) => dispatch(setSortOption(e.target.value as SortOption))}
                className="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer appearance-none"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => dispatch(setSelectedCategory('all'))}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      {processedProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
          {searchTerm && (
            <button 
              onClick={() => dispatch(setSearchTerm(''))}
              className="mt-4 text-brand-600 font-medium hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;