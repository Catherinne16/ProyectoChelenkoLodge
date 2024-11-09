import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Importamos el contexto para acceder al carrito
import './header.css';

function Header({ onCartClick }) {
  // Accedemos al carrito desde el contexto
  const { cart } = useCart();  

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg cont-principal">
          <div className="container-fluid cont-nav">
            <div className="cont-logo col-6">
              <Link className="navbar-brand" to="/"></Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav cont-links">
                <Link className="nav-link efecto" to="/">Inicio</Link>
                <Link className="nav-link efecto" to="/contact">Contacto</Link>
                <Link className="nav-link efecto" to="https://www.chelenko.com/nosotros/" target="_blank">Nosotros</Link>
                <Link className="nav-link efecto" to="https://www.chelenko.com/nosotros/galleria/" target="_blank">Galeria</Link>

                {/* Aquí aplicamos una clase condicional para mostrar la marca roja cuando el carrito tiene artículos */}
                <Link
                  className={`nav-icon efecto d-none d-lg-block ${cart.length > 0 ? 'has-items' : ''}`}
                  to="/"
                  onClick={onCartClick}
                >
                  <i className="bi bi-bag"></i>
                </Link>

                {/* Carrito en vista móvil */}
                <Link className="nav-link efecto d-lg-none" to="/" onClick={onCartClick}>Carrito</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;

