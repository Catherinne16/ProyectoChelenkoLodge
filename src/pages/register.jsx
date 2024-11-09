import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useReservaYPago } from '../context/ReservaYPagoProvider';
import { useNavigate } from 'react-router-dom';
import './register.css';
import './responsive.css';

const Register = () => {
  const { saveUserInfo, saveReservationDetails } = useReservaYPago();
  const { updateUserInfo, updateReservationInfo } = useReservaYPago();
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    totalh: '',
    agree: false,
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAccept = (e) => {
    e.preventDefault();
    const form = e.target; // Agregar la referencia al formulario aquí

    // Validación del formulario
    if (form.checkValidity()) {
      if (cart.length === 0) {
        alert('El carrito está vacío. Agregue productos antes de proceder.');
        return;
      }

      // Actualizar la información del usuario
      updateUserInfo(formData);
      // Combinar con la información del carrito
      updateReservationInfo();
      navigate('/DetalleReserva');
      
      // Preparar los detalles de la reserva (productos en el carrito y total)
      const reservationDetails = {
        usuario: formData,
        detallesReserva: cart,
        total: getTotal(),
      };

      // Guardar los detalles de la reserva
      updateReservationInfo(reservationDetails);


      // Limpiar el formulario después de enviar
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        totalh: '',
        agree: false,
      });
    } else {
      // Validación fallida, agregar clase para mostrar los errores
      form.classList.add('was-validated');
    }
  };

  return (
    <div className="cont-background-register">
      <div className="cont-register">
        <div className="container-fluid register-body">
          <div className="title-register">
            <h1>Información de Reserva</h1>
          </div>

          <div className="style box-style">
            {/* Formulario de registro */}
            <form className="row g-3 needs-validation" onSubmit={handleAccept}>
              {/* Campo de nombre */}
              <div className="col-md-4">
                <label htmlFor="firstName" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo de apellidos */}
              <div className="col-md-4">
                <label htmlFor="lastName" className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo de correo electrónico */}
              <div className="col-md-4">
                <label htmlFor="username" className="form-label">Mail</label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Campo de teléfono */}
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo de país */}
              <div className="col-md-3">
                <label htmlFor="state" className="form-label">País</label>
                <select
                  className="form-select"
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option disabled value="">Escoger...</option>
                  <option value="Chile">Chile</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Alemania">Alemania</option>
                  <option value="España">España</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                  <option value="Francia">Francia</option>
                  <option value="Inglaterra">Inglaterra</option>
                </select>
              </div>

              {/* Campo de número de niños */}
              <div className="col-md-3">
                <label htmlFor="children" className="form-label">Total Huespedes</label>
                <select
                  className="form-select"
                  id="children"
                  value={formData.children}
                  onChange={handleInputChange}
                  required
                >
                  <option disabled value="">Seleccione</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>

              {/* Botón de envío */}
              <div className="col-12 text-center cont-boton-register">
                <button type="submit">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
