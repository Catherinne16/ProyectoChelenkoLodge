import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './terms.css';

// Definición del componente funcional Terminos
const Terms = () => {
  const termsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/terms' && termsRef.current) {
      termsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <div className='fondo-terminos' ref={termsRef}> {/* Contenedor principal del componente */}
        <div className='cont-info-terminos'>
          <div className='cont-terminos'>
            <div className='col-12'> {/* Contenedor para los términos y condiciones */}
              <div className="terminos-texto">
                <h2><strong>Términos y Condiciones</strong></h2>
                <ul>
                  <li>Si deseas realizar pago con transferencia bancaria: por favor, debes contactarte con nosotros a:  <a href="mailto:info@chelenko.com" className='sin-estilos'>info@chelenko.com</a>.</li>
                  <li>Si eres turista extranjero con menos de 3 meses en Chile (validado vía pasaporte) se elimina el impuesto del 19% (IVA). Para ello debes contactarte con nosotros a :  <a href="mailto:info@chelenko.com" className='sin-estilos'>info@chelenko.com</a>.</li>
                  <li>Si haces el pago de la estadía antes o al momento del check-in a más tardar, se cobrará un depósito por 500 USD, los cuales serán liberados íntegramente de no encontrarse ningún daño, el día del check-out después de revisar el estado de la tinycabin.</li>
                </ul>

                <h2><strong>Políticas de Cancelación</strong></h2>
                <ul>
                  <li>Sólo se permiten cancelaciones o cambios de fecha de estadía con un mínimo de 14 días.</li>
                  <li>Si la cancelación o cambio de fecha fueran solicitadas dentro de los 14 días previos a la estadía, se cobrará el 100% del valor de la reserva.</li>
                </ul>

                <h2><strong>Horarios de Entrada y Salida</strong></h2>
                <ul>
                  <li>Horario de Entrada: 03:00 PM</li>
                  <li>Horario de Salida: 11:00 AM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
