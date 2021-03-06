// Importo los archivos necesarios
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Importo la hoja de estilos
import './CreateDate.scss';

// Logica para realizar la creacion de la cita
const CreateDate = () => {
    
    const customerData = JSON.parse(localStorage.getItem('customer'))

    // HOOK
    const  [ date, setDate ] = useState ({
        reason: "",
        date: Date,
        notes: "",
        user_id: customerData.id,
    });

    // Importo la funcion para redirigir al cliente
    const redirect = useHistory ();

    // Manejador de eventos
    const handleEvent = ev => { setDate ({ ...date, [ev.target.name]: ev.target.value })};


    const createDate = () => {
    // POST hacia la base de datos

        axios.post ('http://localhost:8000/api/appointment', date)
        // 'https://backend-clinica-dental.herokuapp.com/dates/create'

        .then ( res => {

            setTimeout (() => {
                redirect.push ('/profile')
            }, 1200)
        })
        .catch ( error => { console.log(error)})

    }

    return (

        <div>
            <form>
                <label>Motivo</label>
                <input type="text" name='reason' onChange={handleEvent}/>
                <label>Dia</label>
                <input type="date" name='date' onChange={handleEvent}/>
                <label>Observaciones</label>
                <input type="text" name='notes' onChange={handleEvent}/>
                <button type="button" onClick={ () => { createDate () }}>Crear</button>
            </form>
        </div>
    )
}

// Exporto el acceso al archivo
export default CreateDate;