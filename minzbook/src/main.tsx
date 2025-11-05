import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from '@/routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/custom.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
