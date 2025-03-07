
import React, { useState, useEffect } from 'react';
import { Product, initialProducts, initialCategories } from '@/utils/data';
import FragranceCard from '@/components/ui/FragranceCard';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  
  useEffect(() => {
    // Extract category from URL params
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Load products
    const timer = setTimeout(() => {
      const savedProducts = localStorage.getItem('products');
      setProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search]);
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.dupeOf && product.dupeOf.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fadeIn">
          <h1 className="text-4xl font-serif mb-4">Unsere Produkte</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entdecke unsere Kollektion an Dupes und originellen Düften.
          </p>
        </div>
        
        <div className="mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <CategoryBadge 
                category="Alle" 
                onClick={() => setSelectedCategory(null)}
                isActive={selectedCategory === null}
              />
              {initialCategories.map(category => (
                <CategoryBadge
                  key={category.id}
                  category={category.name}
                  onClick={() => setSelectedCategory(category.id)}
                  isActive={selectedCategory === category.id}
                />
              ))}
            </div>
            
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Produkt suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="fragrance-card">
                <div className="shimmer h-[280px]" />
                <div className="p-4">
                  <div className="shimmer h-6 w-20 rounded-full mb-2" />
                  <div className="shimmer h-6 w-full mb-1" />
                  <div className="shimmer h-4 w-24 mb-2" />
                  <div className="shimmer h-5 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <p className="text-lg text-muted-foreground">Keine Produkte gefunden.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <FragranceCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
