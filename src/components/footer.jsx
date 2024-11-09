import React, { useState } from 'react';
import logo from '../assets/img/logo-Black.webp';
import flecha from '../assets/img/circulo-de-flecha.png';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    const [email, setEmail] = useState('');

    const suscripcionNews = (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }
        alert(`Te has suscrito con: ${email}`);
        setEmail('');
    };

    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="row">
                    <div className="col-md-3 col-sm-12 newsletter">
                        <img src={logo} className="logo-hotel" alt="Logo de Chelenko Lodge" />
                        <p className="ubicacion-hotel"></p>
                        <p>Suscríbete al newsletter</p>
                        <form onSubmit={suscripcionNews} className="form d-flex align-items-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tuemail@ejemplo.com"
                                required
                                className="form-control me-2"
                                aria-label="Email para suscripción"
                            />
                            <button type="submit" aria-label="Suscribirse al newsletter" className="btn">
                                <img src={flecha} className="flecha" alt="Enviar suscripción" />
                            </button>
                        </form>
                    </div>

                    <div className="col-md-2 col-sm-4">
                        <h4>Acerca de</h4>
                        <ul className="list-unstyled">
                            <li><a className='sin-estilos' href='https://www.chelenko.com/nosotros/' target="_blank" rel="noopener noreferrer">Chelenko Lodge</a></li>
                            <li><a className='sin-estilos' href='https://www.chelenko.com/nosotros/galleria/' target="_blank" rel="noopener noreferrer">Galería</a></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-sm-4">
                        <h4>Ayuda</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/contact" className="sin-estilos">Contáctanos</Link></li>
                            <li><Link to="/metpagoinfo" className="sin-estilos">Métodos de pago</Link></li>
                            <li><Link to="/terms" className="sin-estilos">Términos y condiciones</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-sm-4">
                        <h4>Síguenos</h4>
                        <ul className="list-unstyled">
                            <li><a className='sin-estilos' href='https://www.instagram.com/chelenko_lodge_patagonia/' target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a className='sin-estilos' href='https://es-la.facebook.com' target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a className='sin-estilos' href='https://www.tiktok.com/en/' target="_blank" rel="noopener noreferrer">TikTok</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 col-sm-12">
                        <h4>Contacto</h4>
                        <p><strong>Email:</strong> <br></br>
                        <a href="mailto:info@chelenko.com" className='sin-estilos'>info@chelenko.com</a></p>
                        <p><strong>Teléfono:</strong> <br></br>
                        <a className='sin-estilos' href="tel:56956292538">+56 9 5629 2538</a></p>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <p>&copy; {new Date().getFullYear()} Chelenko Lodge - Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;