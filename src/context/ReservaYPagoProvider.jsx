// ReservaYPagoProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservaYPagoContext = createContext();

export const useReservaYPago = () => {
  const context = useContext(ReservaYPagoContext);
  if (!context) {
    throw new Error("useReservaYPago must be used within a ReservaYPagoProvider");
  }
  return context;
};

const ReservaYPagoProvider = ({ children }) => {
  const [reservationInfo, setReservationInfo] = useState(null);
  const [cartInfo, setCartInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const updateCart = (newCartInfo) => {
    setCartInfo(newCartInfo);
  };

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateReservationInfo = () => {
    if (cartInfo.length > 0 && userInfo) {
      // Calcular el total de noches
      const totalNoches = cartInfo.reduce((acc, item) => acc + (item.noches || 1), 0);
      
      // Calcular el total de tinajas (solo si la propiedad 'tinaja' es un número)
      const totalTinaja = cartInfo.reduce((acc, item) => {
        return acc + (typeof item.tinaja === 'number' ? item.tinaja : 0);
      }, 0);

      const total = cartInfo.reduce((acc, item) => {
        return acc + (item.price * item.quantity || 0);
      }, 0);
      
  
      // Crear detalles de pago para cada ítem del carrito
      const detallesPago = cartInfo.map(item => ({
        label: item.title || 'Item sin título',
        value: item.price ? `$${item.price}` : 'Sin precio',
        bold: item.quantity > 0,
      }));
  
      // Establecer la información de la reserva
      setReservationInfo({
        items: cartInfo,
        huespedes: userInfo.Huespedes || 0,
        fechaLlegada: cartInfo[0]?.fechaLlegada || 'Fecha no disponible',
        fechaSalida: cartInfo[0]?.fechaSalida || 'Fecha no disponible',
        noches: totalNoches,
        tinajadia: totalTinaja, // Total de días de tinaja
        detallesPago,
        total,
      });
    }
  };

  useEffect(() => {
    updateReservationInfo();
  }, [cartInfo, userInfo]);

  return (
    <ReservaYPagoContext.Provider
      value={{
        cartInfo,
        updateCart,
        reservationInfo,
        userInfo,
        updateUserInfo,
        updateReservationInfo,
      }}
    >
      {children}
    </ReservaYPagoContext.Provider>
  );
};

export default ReservaYPagoProvider;
