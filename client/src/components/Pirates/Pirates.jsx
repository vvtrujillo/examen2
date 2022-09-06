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
                setDatos(resp.data.datosPirate);
                }else {
                Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
            })
    }, [])


    return(
        <React.Fragment>
            <h1>Pirata</h1>            
            <div className="pirate-body-result">
                <div className="pirate-body-result-l">
                    <h3>Nombre Pirata: {datos.nombre}</h3>
                    <img src={datos.linkimagen} alt="Imagen Pirata" />
                    <h2>Frase del Pirata:</h2>
                    <p>{datos.frase}</p>
                </div>
                <div className="pirate-body-result-r">
                    <img src={datos.linkimagen} alt="Imagen Pirata" />
                </div>
                
            </div>            
        </React.Fragment>
    )
}

export default Pirates;