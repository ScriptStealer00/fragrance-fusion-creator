
import React, { useState, useEffect } from 'react';
import { Product, Category } from '@/utils/data';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  categories,
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      brand: '',
      category: categories.length > 0 ? categories[0].id : '',
      description: '',
      dupeOf: '',
      price: 0,
      imageUrl: '',
      notes: [],
      featured: false
    }
  );
  
  const [notesInput, setNotesInput] = useState('');
  
  // Update category if categories change
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({
        ...prev,
        category: categories[0].id
      }));
    }
  }, [categories, formData.category]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };
  
  const handleAddNote = () => {
    if (notesInput.trim()) {
      setFormData({
        ...formData,
        notes: [...(formData.notes || []), notesInput.trim()]
      });
      setNotesInput('');
    }
  };
  
  const handleRemoveNote = (index: number) => {
    setFormData({
      ...formData,
      notes: (formData.notes || []).filter((_, i) => i !== index)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.description || !formData.imageUrl || formData.price === undefined) {
      toast.error('Bitte fülle alle Pflichtfelder aus');
      return;
    }
    
    // Generate an ID if it's a new product
    const completeProduct = {
      ...formData,
      id: formData.id || `prod_${Date.now()}`
    } as Product;
    
    onSave(completeProduct);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <h2 className="font-serif text-xl mb-6">{product ? 'Produkt bearbeiten' : 'Neues Produkt'}</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="admin-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Marke*</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="admin-input"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kategorie*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="admin-input"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Preis (€)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="admin-input"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Dupe von (optional)</label>
          <input
            type="text"
            name="dupeOf"
            value={formData.dupeOf || ''}
            onChange={handleChange}
            className="admin-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Bild URL*</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="admin-input"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Beschreibung*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="admin-input min-h-[100px]"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Noten</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="admin-input"
              placeholder="Note hinzufügen und Enter drücken"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNote())}
            />
            <button
              type="button"
              onClick={handleAddNote}
              className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors duration-300"
            >
              +
            </button>
          </div>
          
          {(formData.notes || []).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.notes?.map((note, index) => (
                <div key={index} className="bg-secondary rounded-full px-3 py-1 text-xs flex items-center">
                  {note}
                  <button
                    type="button"
                    onClick={() => handleRemoveNote(index)}
                    className="ml-2 text-xs text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-gold rounded"
          />
          <label htmlFor="featured" className="ml-2 text-sm">
            Als Highlight markieren
          </label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors duration-300"
        >
          Speichern
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
