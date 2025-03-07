
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '@/components/admin/AdminPanel';

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 opacity-0 animate-fadeIn">
          <h1 className="text-3xl font-serif">BySAM Parfüm Admin-Bereich</h1>
          <p className="text-muted-foreground">
            Hier kannst du Produkte und Kategorien verwalten sowie Highlights festlegen.
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;
