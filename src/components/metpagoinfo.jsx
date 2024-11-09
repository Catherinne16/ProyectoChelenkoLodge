import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logoTransbank from '../assets/img/webpaylogo.webp';
import './metpagoinfo.css';

const PaymentMethods = () => {
  const paymethodsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/metpagoinfo' && paymethodsRef.current) {
      paymethodsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const methods = [
    {
      name: 'Tarjeta de Crédito',
      description: 'Paga de forma segura con tu tarjeta de crédito.',
      icon: '💳',
    },
    {
      name: 'Tarjeta de Débito',
      description: 'Paga de forma segura con tu tarjeta de débito.',
      icon: '💸',
    },
    {
      name: 'Transferencia Bancaria',
      description: 'Lo sentimos, aún no está disponible ):',
      icon: '🏦',
    },
    {
      name: 'PayPal',
      description: 'Lo sentimos, aún no está disponible ):',
      icon: '🌐',
    },
  ];

  return (
    <>
      <div className='payment-background' ref={paymethodsRef}>
        <div className='cont-payment'>
          <div className='payment-methods'>
            <h1>Métodos de Pago</h1>
            <img src={logoTransbank} className="foto-trans"></img>
            <div>
              <p><strong>Webpay Plus</strong> es una plataforma de pago segura de Transbank que permite pagar con tarjetas de crédito y débito chilenas. Al elegirlo, serás redirigido a un portal seguro para completar la transacción y luego regresarás al sitio con la compra confirmada.</p>
            </div>
            <div className="methods-list">
              {methods.map((method, index) => (
                <div key={index} className="method-item">
                  <span className="method-icon">{method.icon}</span>
                  <h2>{method.name}</h2>
                  <p>{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;