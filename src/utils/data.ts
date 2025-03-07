
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // Changed from enum to string to allow dynamic categories
  description: string;
  dupeOf?: string;
  price: number;
  imageUrl: string;
  notes?: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export const initialCategories: Category[] = [
  { id: 'perfume', name: 'Parfüm' },
  { id: 'deodorant', name: 'Deo' },
  { id: 'lattafa', name: 'Lattafa' },
  { id: 'soap', name: 'Seife' },
  { id: 'other', name: 'Andere' },
];

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Bloom',
    brand: 'Essence Dupes',
    category: 'perfume',
    description: 'Ein luxuriöses Duplikat des beliebten Black Opium',
    dupeOf: 'YSL Black Opium',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000',
    notes: ['Kaffee', 'Vanille', 'Jasmin'],
    featured: true
  },
  {
    id: '2',
    name: 'Desert Rose',
    brand: 'Lattafa',
    category: 'lattafa',
    description: 'Ein exquisites orientalisches Parfüm mit Rosenduft',
    price: 45.99,
    imageUrl: 'https://images.unsplash.com/photo-1583345237503-d141309f766e?q=80&w=1000',
    notes: ['Rose', 'Oud', 'Safran'],
    featured: true
  },
  {
    id: '3',
    name: 'Fresh Ocean',
    brand: 'Pure Dupes',
    category: 'deodorant',
    description: 'Ein frisches Deodorant inspiriert von Acqua di Gio',
    dupeOf: 'Acqua di Gio',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c79?q=80&w=1000',
    notes: ['Bergamotte', 'Meeresakkord', 'Patschuli']
  },
  {
    id: '4',
    name: 'Lavender Dreams',
    brand: 'Essence Dupes',
    category: 'soap',
    description: 'Luxuriöse Handseife mit beruhigendem Lavendelduft',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=1000',
    notes: ['Lavendel', 'Kamille', 'Bergamotte']
  },
];

// Simulated authentication logic
export const mockUser: User = {
  id: 'admin1',
  username: 'admin',
  isAdmin: true
};

export const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};
