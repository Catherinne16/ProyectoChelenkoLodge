import React, { useState } from 'react';
import './navbar.css';

function Navbar({ toggleCart }) { // Recibe toggleCart como prop
    const [navData, setNavData] = useState({
        checkin: '',
        checkout: ''
    });

    // Función para agregar la hora actual a la fecha seleccionada
    const addCurrentTimeToDate = (date) => {
        // Si la fecha está vacía, retornamos la fecha vacía
        if (!date) return '';

        // Creamos un objeto Date con la fecha seleccionada
        const selectedDate = new Date(date);

        // Obtenemos la hora actual
        const currentTime = new Date();

        // Ajustamos la hora, minutos, segundos y milisegundos de la fecha seleccionada con la hora actual
        selectedDate.setHours(currentTime.getHours());
        selectedDate.setMinutes(currentTime.getMinutes());
        selectedDate.setSeconds(currentTime.getSeconds());
        selectedDate.setMilliseconds(currentTime.getMilliseconds());

        // Devolvemos la fecha con la hora actual en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
        return selectedDate.toISOString().slice(0, 19); // Nos quedamos con la fecha y hora sin los milisegundos
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNavData(prevData => ({
            ...prevData,
            [name]: value // Guardamos solo la fecha (YYYY-MM-DD)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkinWithTime = addCurrentTimeToDate(navData.checkin);
        const checkoutWithTime = addCurrentTimeToDate(navData.checkout);

        console.log('Fecha de Entrada y Salida enviados:', {
            checkin: checkinWithTime,
            checkout: checkoutWithTime
        });
        // Aquí normalmente enviarías los datos a un servidor
    };

    return (
        <>
            <div>
                <div className='container-navbar'>
                    <div className="container-fluid">
                        <div className="cont">
                            <form onSubmit={handleSubmit} className="row formulario">
                                <div className="col-12 col-lg-5 col-md-6 col-sm-6 my-2">
                                    <label htmlFor="checkin" className="form-label">Entrada:</label>
                                    <input 
                                        type="date" 
                                        id="checkin" 
                                        name="checkin" 
                                        value={navData.checkin} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                    />
                                </div>
                                <div className="col-12 col-lg-5 col-md-6 col-sm-6 my-2">
                                    <label htmlFor="checkout" className="form-label">Salida:</label>
                                    <input 
                                        type="date" 
                                        id="checkout" 
                                        name="checkout" 
                                        value={navData.checkout} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                    />
                                </div>
                                <div className="col-lg-2 my-2  buscar">
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
