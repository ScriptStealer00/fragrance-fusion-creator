
import React, { useState } from 'react';
import { Product, initialProducts as defaultProducts } from '@/utils/data';
import ProductForm from './ProductForm';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'perfume': return 'Parfüm';
      case 'deodorant': return 'Deo';
      case 'lattafa': return 'Lattafa';
      case 'soap': return 'Seife';
      default: return 'Andere';
    }
  };
  
  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };
  
  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setIsAddingProduct(false);
    toast.success('Produkt erfolgreich hinzugefügt');
  };
  
  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    saveProducts(updatedProducts);
    setEditingProduct(null);
    toast.success('Produkt erfolgreich aktualisiert');
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Möchtest du dieses Produkt wirklich löschen?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
      toast.success('Produkt erfolgreich gelöscht');
    }
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.dupeOf && product.dupeOf.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl">Produktverwaltung</h2>
        <button
          onClick={() => {
            setIsAddingProduct(true);
            setEditingProduct(null);
          }}
          className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors duration-300"
        >
          + Neues Produkt
        </button>
      </div>
      
      {(isAddingProduct || editingProduct) ? (
        <ProductForm
          product={editingProduct || undefined}
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        />
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Suche nach Produkten..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Bild</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Marke</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Kategorie</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Preis</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Dupe für</th>
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      Keine Produkte gefunden
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={getCategoryName(product.category)} />
                      </td>
                      <td className="px-4 py-3 text-gold font-medium">{product.price.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-gray-600">{product.dupeOf || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewProduct(product.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Ansehen"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-1 text-amber-600 hover:text-amber-800"
                            title="Bearbeiten"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Löschen"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
