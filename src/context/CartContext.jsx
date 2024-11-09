import React, { createContext, useContext, useState } from 'react';
import { useReservaYPago } from './ReservaYPagoProvider';  // Importa el hook para actualizar la reserva

// Crear el contexto para el carrito
const CartContext = createContext();

// Proveedor del CartContext
export const CartProvider = ({ children }) => {
  const { updateCart } = useReservaYPago();  // Usamos el hook de ReservaYPago para actualizar el carrito
  const [cart, setCart] = useState([]); // Estado para los ítems del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para agregar un ítem al carrito
  const addItemToCart = (item) => {
    setCart((prevCart) => {
      // Verificamos si el ítem ya existe en el carrito
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si el ítem ya existe, incrementamos la cantidad
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Si no existe, agregamos el ítem con cantidad 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Actualizamos el carrito en el contexto de ReservaYPago
    updateCart([
      ...cart,  // Mantener los ítems anteriores
      { ...item, quantity: 1 } // Agregar el nuevo ítem
    ]);
  };

  // Función para obtener el total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Función para actualizar la cantidad de un ítem
  const updateItemQuantity = (id, quantity) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      )
    );
  };

  // Función para eliminar un ítem del carrito
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId); // Filtramos el ítem que queremos eliminar
    setCart(updatedCart); // Actualizamos el carrito local

    // Actualizamos el carrito en el contexto de ReservaYPago
    updateCart(updatedCart); // Enviamos los ítems restantes al contexto de ReservaYPago
  };

   // Función para abrir o cerrar el carrito
   const toggleCart = () => {
    console.log('llamando a togglecart')
    setIsCartOpen((prev) => !prev);  // Alternar el estado de apertura/cierre
  };

  return (
    <CartContext.Provider value={{
      cart,
      getTotal,
      updateItemQuantity,
      addItemToCart,
      removeItemFromCart,
      isCartOpen,
      setIsCartOpen, // Pasamos la función setIsCartOpen al contexto
      toggleCart      // También podemos incluir una función de alternancia
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al CartContext desde otros componentes
export const useCart = () => useContext(CartContext);
