
import React, { useState } from 'react';
import { Product, Category, initialProducts as defaultProducts, initialCategories as defaultCategories } from '@/utils/data';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
  });
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Andere';
  };
  
  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };
  
  const saveCategories = (updatedCategories: Category[]) => {
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
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
  
  const handleAddCategory = (newCategory: Category) => {
    // Check if category ID already exists
    if (categories.some(c => c.id === newCategory.id)) {
      toast.error('Eine Kategorie mit dieser ID existiert bereits');
      return;
    }
    
    const updatedCategories = [...categories, newCategory];
    saveCategories(updatedCategories);
    setIsAddingCategory(false);
    toast.success('Kategorie erfolgreich hinzugefügt');
  };
  
  const handleUpdateCategory = (updatedCategory: Category) => {
    // Check if we're trying to update to an ID that already exists (except for this category)
    if (categories.some(c => c.id === updatedCategory.id && c.id !== editingCategory?.id)) {
      toast.error('Eine Kategorie mit dieser ID existiert bereits');
      return;
    }
    
    const updatedCategories = categories.map(c => 
      c.id === editingCategory?.id ? updatedCategory : c
    );
    
    // If the category ID changed, we need to update all products that use this category
    if (editingCategory && editingCategory.id !== updatedCategory.id) {
      const updatedProducts = products.map(product => {
        if (product.category === editingCategory.id) {
          return { ...product, category: updatedCategory.id };
        }
        return product;
      });
      saveProducts(updatedProducts);
    }
    
    saveCategories(updatedCategories);
    setEditingCategory(null);
    toast.success('Kategorie erfolgreich aktualisiert');
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    // Check if any products are using this category
    const productsUsingCategory = products.filter(p => p.category === categoryId);
    
    if (productsUsingCategory.length > 0) {
      toast.error(`Diese Kategorie kann nicht gelöscht werden, da ${productsUsingCategory.length} Produkte sie verwenden`);
      return;
    }
    
    if (window.confirm('Möchtest du diese Kategorie wirklich löschen?')) {
      const updatedCategories = categories.filter(c => c.id !== categoryId);
      saveCategories(updatedCategories);
      toast.success('Kategorie erfolgreich gelöscht');
    }
  };
  
  const handleToggleFeatured = (product: Product) => {
    const updatedProduct = { ...product, featured: !product.featured };
    const updatedProducts = products.map(p => 
      p.id === product.id ? updatedProduct : p
    );
    saveProducts(updatedProducts);
    toast.success(`Produkt ${updatedProduct.featured ? 'als Highlight markiert' : 'von Highlights entfernt'}`);
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.dupeOf && product.dupeOf.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const featuredProducts = products.filter(product => product.featured);
  
  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="products">Produkte</TabsTrigger>
        <TabsTrigger value="categories">Kategorien</TabsTrigger>
        <TabsTrigger value="featured">Highlights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="products">
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
              categories={categories}
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
                      <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Highlight</th>
                      <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
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
                            <button
                              onClick={() => handleToggleFeatured(product)}
                              className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                product.featured 
                                  ? 'bg-gold text-white' 
                                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                              }`}
                              title={product.featured ? 'Als Highlight entfernen' : 'Als Highlight markieren'}
                            >
                              {product.featured ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m12 17.8-8.4 4.2 1.6-9.3L.5 7.3l9.3-1.4L12 0l3.2 5.9 9.3 1.4-6.7 5.4 1.6 9.3z"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                              )}
                            </button>
                          </td>
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
      </TabsContent>
      
      <TabsContent value="categories">
        <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl">Kategorieverwaltung</h2>
            <button
              onClick={() => {
                setIsAddingCategory(true);
                setEditingCategory(null);
              }}
              className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors duration-300"
            >
              + Neue Kategorie
            </button>
          </div>
          
          {(isAddingCategory || editingCategory) ? (
            <CategoryForm
              category={editingCategory || undefined}
              onSave={editingCategory ? handleUpdateCategory : handleAddCategory}
              onCancel={() => {
                setIsAddingCategory(false);
                setEditingCategory(null);
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Produkte</th>
                    <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                        Keine Kategorien gefunden
                      </td>
                    </tr>
                  ) : (
                    categories.map(category => {
                      const productCount = products.filter(p => p.category === category.id).length;
                      
                      return (
                        <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">{category.id}</td>
                          <td className="px-4 py-3">
                            <CategoryBadge category={category.name} />
                          </td>
                          <td className="px-4 py-3 text-gray-600">{productCount} Produkte</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingCategory(category)}
                                className="p-1 text-amber-600 hover:text-amber-800"
                                title="Bearbeiten"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className={`p-1 ${productCount > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                                title={productCount > 0 ? 'Kann nicht gelöscht werden (wird von Produkten verwendet)' : 'Löschen'}
                                disabled={productCount > 0}
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
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="featured">
        <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl">Highlights</h2>
            <div className="text-sm text-muted-foreground">
              Produkte als Highlight markieren, um sie auf der Startseite anzuzeigen
            </div>
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
                  <th className="px-4 py-3 text-left font-medium text-sm text-gray-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {featuredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      Keine Highlights gefunden. Markiere Produkte als Highlight, um sie hier anzuzeigen.
                    </td>
                  </tr>
                ) : (
                  featuredProducts.map(product => (
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
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleFeatured(product)}
                          className="p-1 text-gold hover:text-amber-600"
                          title="Von Highlights entfernen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 17.8-8.4 4.2 1.6-9.3L.5 7.3l9.3-1.4L12 0l3.2 5.9 9.3 1.4-6.7 5.4 1.6 9.3z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminPanel;
