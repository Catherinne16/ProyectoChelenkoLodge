import React from 'react';
import './metodopago.css';
import logoTransbank from '../assets/img/webpaylogo.webp';
import './responsive.css';

const MetodoPago = () => {
  const handlePayment = () => {
    alert("Sera redirigido a la pagina de Webpay");  // Simulación del proceso de pago
  };

  return (
    <div className="contenedor-principal">
      <div className="cont-opciones">
        <div className="container cont-pago">
          <div className="cont-logoTransbank">
            <div className="contenedor-logo">
              <img className="imgTransbank" src={logoTransbank} alt="Transbank Logo" />
            </div>
          </div>
          <div className="col-12 info">
            <p>
              Al hacer clic en <strong>"Completar su Reserva"</strong>, serás redirigido a una ventana segura de Transbank para completar tu pago.
            </p>
          </div>
          <div className="col-12 aviso">
            <p>
              Chelenko Lodge trabaja junto a Transbank para facilitar transacciones seguras y eficientes, permitiendo a sus huéspedes realizar pagos con tarjetas de crédito y débito sin complicaciones.
            </p>
          </div>
          <div className="col-12 seguridad">
            <p><strong>Transacción Segura: </strong>Transbank Utiliza encriptación SSL para proteger tu información y cumplir con estándares de seguridad PCI-DSS.</p>
          </div>
          <div className="col-12 inf">
            <p><strong>Si el pago es rechazado, verifica que tus fondos sean suficientes o contacta a tu banco.</strong></p>
          </div>
        </div>
        <div className="cont-terminos-pago">
          <div className="col-12 inputPago">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input col-2"
                id="terms"
              />
              <label className="form-check-label col-10 terminos-pago" htmlFor="terms">
                Estoy de acuerdo con los <a className="link-terminos" href="/terms" target="_blank">términos y condiciones</a> de Chelenko Lodge
              </label>
            </div>
          </div>
          <div className="col-12 cont-boton-pago">
            <button className="btn-completar" onClick={handlePayment}>IR A PAGAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodoPago;
