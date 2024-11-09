import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './contact.css';

function Contact() {
    const notify = () => toast.info('¡Gracias por Contactarnos! Responderemos lo antes posible.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const contactRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/contact' && contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario enviados:', formData);
        // Aquí normalmente enviarías los datos a un servidor
        notify();
    };

    return (
        <>
            <div className='fondo-contact' ref={contactRef}>
                <div className="contact-container" >
                    <div className='contact-body'>
                        <h1>¿Tienes Alguna Pregunta?</h1>
                        <p className="subtitle">Estamos Aquí para Ayudarte. Utiliza el Formulario para Comunicarte con Nosotros.</p>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="nombre">NOMBRE</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefono">TELEFONO</label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mensaje">MENSAJE</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className='contact-btn'>
                                <button type="submit" className="submit-btn">ENVIAR MENSAJE</button>
                            </div>                         
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;