import React, { useEffect, useRef } from 'react';
import { useReservaYPago } from '../context/ReservaYPagoProvider';
import { useLocation } from 'react-router-dom';
import Total from './total';  // Asegúrate de importar el componente Total
import './info-reserva.css';
import './responsive.css';

const DetalleReserva = () => {
  const { reservationInfo } = useReservaYPago();
  const reservaRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromRegister && reservaRef.current) {
      reservaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  console.log('info:', reservationInfo);

  // Asegurarse de que la información de la reserva existe antes de renderizar
  if (!reservationInfo || !reservationInfo.items || reservationInfo.items.length === 0) {
    return <p>No hay información de reserva disponible.</p>;
  }

  const habitacion = reservationInfo.items[0];
  const noches = reservationInfo.noches || 0;
  const diasTinaja = reservationInfo.tinajadia || 0;
  const total = reservationInfo?.total || 0; // Obtener el total de la reserva

  return (
    <div id="detalle-reserva" ref={reservaRef} className="container container-info-pago my-4">
      <div className="card mx-auto">
        <div className="card-header">
          <h5 className="card-title mb-0">Su Reserva</h5>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <h6 className="fw-bold">Habitación:</h6>
            <p className="small mb-1">{habitacion?.title || 'No disponible'}</p>
            <p className="small">Huespedes: {reservationInfo.huespedestotal || 0}</p>
          </div>

          <div className="row mb-3">
            <div className="col-sm-6 mb-2 mb-sm-0">
              <h6 className="fw-bold">Fecha de llegada:</h6>
              <p className="small">{habitacion?.fechaLlegada || 'Fecha no disponible'}</p>
            </div>
            <div className="col-sm-6">
              <h6 className="fw-bold">Fecha de salida:</h6>
              <p className="small">{habitacion?.fechaSalida || 'Fecha no disponible'}</p>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="fw-bold">Noches:</h6>
            <p className="small">{noches || 0}</p>
          </div>

          <div className="mb-3">
            <h6 className="fw-bold">Días de Tinaja:</h6>
            <p className="small">{diasTinaja || 0}</p>
          </div>

          <div className="border-top pt-3">
            {reservationInfo.detallesPago && reservationInfo.detallesPago.length > 0 ? (
              reservationInfo.detallesPago.map((item, index) => (
                <div
                  key={index}
                  className={`d-flex justify-content-between mb-2 fw-bold`}
                >
                  <span>{item.label || 'Detalles no disponibles'}</span>
                  <span>{item.value || 'Valor no disponible'}</span>
                </div>
              ))
            ) : (
              <p>No hay detalles de pago disponibles.</p>
            )}
          </div>

          <div className="border-top pt-3">
            <div className="d-flex justify-content-between mb-2 fw-bold">
              <span>Total:</span>
              <span>${total || 'No disponible'}</span>
            </div>
          </div>

          {/* Enviar el total al componente Total */}
          <Total total={total} /> {/* Aquí lo pasamos como prop */}

        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;
