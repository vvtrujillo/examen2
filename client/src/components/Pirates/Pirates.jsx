import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Pirates = () => {

    const {id} = useParams(); //rescato el id desde el parametro de la URL
    const [datos, setDatos] = useState({});

    useEffect(() => {
        axios.get((`/api/v1/pirates/${id}`))
            .then(resp => {
                if(!resp.data.error){
                console.log('Use Effect para listar los piratas creados',resp.data.datosPirate)
                setDatos(resp.data.datosPirate);                
                }else {
                Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
            })
    }, [])


    return(
        <React.Fragment>
            <h1>Pirata</h1>
            <p>{datos.nombre}</p>
        </React.Fragment>
    )
}

export default Pirates;