import React, { useState, useEffect } from 'react';
import MetodoPago from './metodopago';  // Importamos el componente MetodoPago
import './responsive.css';

const Total = ({ total }) => {
  const [showPayment, setShowPayment] = useState(false);  // Estado para controlar la visibilidad de MetodoPago

  const handlePayment = () => {
    setShowPayment(true);
  };

  // Verifica el valor de showPayment cada vez que cambie
  useEffect(() => {
    console.log('showPayment actualizado:', showPayment);
  }, [showPayment]);

  return (
    <div className="total-container">
      <div className="total-info">
        <h4>Total a pagar: ${total || 0}</h4>
        <button className="btn-completar" onClick={handlePayment}>
          Continuar
        </button>
      </div>

      {/* Si showPayment es true, mostramos el componente MetodoPago */}
      {showPayment && <MetodoPago />}
    </div>
  );
};

export default Total;
