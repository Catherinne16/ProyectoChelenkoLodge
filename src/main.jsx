import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import ReservaYPagoProvider from './context/ReservaYPagoProvider';  // Importación por defecto
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ReservaYPagoProvider>  {/* Envuelve el componente principal con ReservaYPagoProvider */}
          <CartProvider>
            <App />
          </CartProvider>
        </ReservaYPagoProvider>
      </React.StrictMode>
    );
  } else {
    console.error('El contenedor con id "app" no se encontró en el DOM.');
  }
});
