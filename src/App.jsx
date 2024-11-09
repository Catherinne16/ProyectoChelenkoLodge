import React, { useState, useRef } from 'react';  // Importa React y el hook useState para gestionar estados locales.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa componentes para la navegación (enrutamiento) entre páginas.
import Header from './components/header';  // Importa el componente Header, asegúrate de que la ruta sea correcta.
import Navbar from './components/navbar';  // Importa el componente Navbar.
import MiniCart from './components/minicart';  // Importa el componente MiniCart.
import Footer from './components/footer';  // Importa el componente Footer.
import Payment from './components/payment';
import DetalleReserva from './pages/DetalleReserva';  // Importa la página de información de reserva.
import Register from './pages/register';  // Importa la página de registro.
import Contact from './components/contact';  // Importa el componente Contact.
import Home from './components/home';  // Importa el componente Home, asegúrate de que la ruta sea correcta.
import Cardcabin from './components/Cardcabin';  // Importa el componente que contiene las tarjetas de cabañas.
import Terms from './components/terms';  // Importa el componente de términos y condiciones.
import MetodoPago from './pages/metodopago';
import MetPagoInfo from './components/metpagoinfo'; // Importa el componente de la info de los métodos de pago.
import ReservaYPagoProvider from './context/ReservaYPagoProvider'; // Importa el provider para reservas y pagos.
import { CartProvider, useCart } from './context/CartContext';  // Importa el CartProvider que provee el contexto del carrito.
import { ToastContainer } from 'react-toastify'; // Importa el componente ToastContainer para mostrar mensajes de notificación.
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos para el componente ToastContainer.
import './index.css';  // Importa el archivo de estilos globales.


const App = () => {
    // Aquí puedes usar el hook useCart para acceder al estado y funciones del carrito
    const { isCartOpen, setIsCartOpen } = useCart();  // Accedemos a isCartOpen y setIsCartOpen desde el contexto
  
    // Función para alternar el estado del carrito
    const toggleMiniCart = (open = false) => {
      if (open === true) {
        setIsCartOpen(true);
      } else {
        setIsCartOpen((prev) => !prev);  // Alternamos la visibilidad del carrito
      }
    };

    return (
        <ReservaYPagoProvider>  {/* Coloca el ReservaYPagoProvider primero */}
            <CartProvider>  {/* Luego el CartProvider, para que esté dentro del contexto de ReservaYPago */}
                <Router>  {/* Envoltorio que habilita la navegación entre rutas en la aplicación. */}
                    <div className="contenedorPadre overflow-auto">
                        <Header onCartClick={toggleMiniCart}/>  {/* Pasa la función 'toggleMiniCart' como prop al Header para manejar el evento de clic en el carrito. */}
                        <Navbar/>  {/* Muestra la barra de navegación. */}
                        <MiniCart onClose={() => setIsCartOpen(false)} isOpen={isCartOpen} />  {/* Componente MiniCart que se abre o cierra según el estado 'isCartOpen', y permite cerrarlo con 'onClose'. */}
                        <Routes>  {/* Contenedor que maneja las diferentes rutas de la aplicación. */}
                            <Route path="/" element={<Home onOpenMiniCart={toggleMiniCart}/>} />  {/* Ruta para la página de inicio que renderiza el componente Home. */}
                            <Route path="/register" element={<Register />} />  {/* Ruta para la página de registro. */}
                            <Route path="/contact" element={<Contact />} />  {/* Ruta para la página de contacto. */}
                            <Route path="/cabin" element={<Cardcabin />} /> {/* Ruta para la página de cabañas, pasando la función para abrir el mini cart. */}
                            <Route path="/payment" element={<Payment />} />  {/* Ruta para la página de métodos de pago. */}
                            <Route path="/terms" element={<Terms />} />  {/* Ruta para la página de términos y condiciones. */}
                            <Route path="/metpagoinfo" element={<MetPagoInfo />} />  {/* Ruta para la página de info de métodos de pago. */}
                            <Route path='/DetalleReserva' element={<DetalleReserva />} /> 
                            <Route path='/metodopago' element={<MetodoPago />} /> 
                        </Routes>                             
                        <Footer />  {/* Muestra el pie de página. */}
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />  {/* Componente ToastContainer para mostrar mensajes de notificación. */}
                    </div>
                </Router>
            </CartProvider>
        </ReservaYPagoProvider>
    );
};

export default App;  // Exporta el componente App para ser utilizado en otras partes de la aplicación.
