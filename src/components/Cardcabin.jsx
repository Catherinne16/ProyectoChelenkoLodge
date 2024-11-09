import React, { useState } from 'react';
import { useCart } from '../context/CartContext';  // Importar el contexto del carrito
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faSpa, faBanSmoking, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import suiteImage from "../assets/img/tinycard.webp";
import tinyImage from "../assets/img/suitecard.webp";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './apifakecard.css';
import './responsive.css';


const Cardcabin = ({ onOpenMiniCart }) => {
  const { addItemToCart } = useCart();  // Obtener funciones del contexto del carrito
  const [currentIndex, setCurrentIndex] = useState(0);  // Estado para el índice del item actual en el carrusel
  const notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  // Datos de las cabañas y servicios adicionales
  const cardsData = [
    {
      id: 1,
      title: 'Suite',
      price: 73900,
      img: suiteImage,
      description: 'Una suite lujosa con todas las comodidades para una estancia relajante.',
      additionalService: { name: 'Tinaja Suite (Valor Diario):', price: 60000 },
      conditions: [
        { icon: faPaw, text: 'Pet Friendly' },
        { icon: faSpa, text: 'Servicios adicionales' },
        { icon: faBanSmoking, text: 'No fumar en la cabaña' }
      ]
    },
    {
      id: 2,
      title: 'Tiny Cabin',
      price: 95900,
      img: tinyImage,
      description: 'Una pequeña cabaña acogedora, perfecta para una escapada tranquila.',
      additionalService: { name: 'Tinaja Tiny (Valor Diario):', price: 45000 },
      conditions: [
        { icon: faPaw, text: 'Pet Friendly' },
        { icon: faSpa, text: 'Servicios adicionales' },
        { icon: faBanSmoking, text: 'No fumar en la cabaña' }
      ]
    }
  ];

  // Función para cambiar al siguiente item del carrusel
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  // Función para cambiar al anterior item del carrusel
  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length);
  };

  // Función para agregar solo la cabaña al carrito
  const addCabinToCart = () => {
    const cabinItem = {
      id: cardsData[currentIndex].id,
      img: cardsData[currentIndex].img,
      title: cardsData[currentIndex].title,
      price: cardsData[currentIndex].price,
      description: cardsData[currentIndex].description
    };
    addItemToCart(cabinItem);  // Agregar el item de la cabaña al carrito usando el contexto
    onOpenMiniCart(true);  // Abrir el mini cart automáticamente
  };

  // Función para agregar el servicio adicional (tinaja) al carrito
  const addAdditionalServiceToCart = () => {
    const additionalServiceItem = {
      id: `${cardsData[currentIndex].id}-additional`,  // ID único para el servicio adicional
      title: cardsData[currentIndex].additionalService.name,
      price: cardsData[currentIndex].additionalService.price,
      description: `Servicio adicional para ${cardsData[currentIndex].title}`  // Descripción detallada
    };
    addItemToCart(additionalServiceItem);  // Agregar el servicio adicional al carrito
    onOpenMiniCart(true);  // Abrir el mini cart automáticamente
  };

  return (
    <div className="carousel">
      {/* Botón para ir al ítem anterior en el carrusel */}
      <button className="view-button view-button-left" onClick={prevCard} aria-label="Previous">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Contenedor de la tarjeta actual */}
      <div className="cont-card">
        <div key={cardsData[currentIndex].id} className="card">
          <img src={cardsData[currentIndex].img} alt={cardsData[currentIndex].title} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title">{cardsData[currentIndex].title}</h3>
            <p className="card-text">{cardsData[currentIndex].description}</p>
            <p className="price">Valor por Noche: ${cardsData[currentIndex].price.toLocaleString()}</p>
            <p className="additional-service">{cardsData[currentIndex].additionalService.name} ${cardsData[currentIndex].additionalService.price.toLocaleString()}</p>

            {/* Mostrar condiciones o características de la cabaña */}
            <div className="conditions">
              {cardsData[currentIndex].conditions.map((condition, index) => (
                <div key={index} className="condition-item">
                  <FontAwesomeIcon icon={condition.icon} className="condition-icon" />
                  <span>{condition.text}</span>
                </div>
              ))}
            </div>
            {/* Botón para agregar la cabaña al carrito */}
            <div className="button-container">
              <button
                className="btn btn-primary price-btn"
                onClick={() => {
                  addCabinToCart();  // Llamar a la función para agregar cabaña al carrito
                  notify('Habitación agregada!');  // Mostrar notificación
                }}
              >
                Añadir cabaña al Carrito: ${cardsData[currentIndex].price.toLocaleString()}
              </button>

              {/* Botón para agregar el servicio adicional (tinaja) al carrito */}
              <button
                className="btn btn-primary price-btn"
                onClick={() => {
                  addAdditionalServiceToCart();  // Llamar a la función para agregar servicio adicional al carrito
                  notify('Servicio adicional agregado!');  // Mostrar notificación
                }}
              >
                Añadir Servicio de Tinaja al Carrito: ${cardsData[currentIndex].additionalService.price.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para ir al siguiente ítem en el carrusel */}
      <button className="view-button view-button-right" onClick={nextCard} aria-label="Next">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Cardcabin;
