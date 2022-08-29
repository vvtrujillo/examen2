import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarCompletados from './Proyectos/ListarCompletados';
import ListarInProgress from './Proyectos/ListarInProgess';
import ListarPendientes from './Proyectos/ListarPendientes';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import Formulario from './Proyectos/Formulario';
import { Container, Button, Row, Col } from "reactstrap";



const MainProyectos = () => {

    const [datos, setDatos] = useState([]);
    const [recargar, setRecargar] = useState(false);
    const navigate = useNavigate();

    const eliminar = (proyecto) => {
        Swal.fire({
            text: `Seguro que desea eliminar a ${proyecto.nombre}?`,
            title: 'Eliminar',
            showCancelButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: 'red',
            cancelButtonText: 'No',
            cancelButtonColor:'green'
        }).then(resp => {
            if(resp.isConfirmed) {
                axios.delete(`http://localhost:8000/api/v1/proyectos/${proyecto._id}`)
                    .then(respuesta => {
                        if(!respuesta.data.error) {
                            Swal.fire('Exito','Se ha eliminado el proyecto','success');
                            setRecargar(!recargar);                            
                        } else {
                            Swal.fire('Ooops!!!', respuesta.data.mensaje, 'error');
                        }
                    });                    
            }
        })
    }

    const editar = (proyecto) => {
        console.log('voy a editar', datos)
        return axios.put(`http://localhost:8000/api/v1/proyectos/${datos._id}`, proyecto)
            .then(resp => {
                if(!resp.data.error) {
                    setRecargar(!recargar);
                    return true;
                } else {
                    Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                    return false;
                }
            })
    }

    return(
        <React.Fragment>            
            <div className='main-comp'>
                <h1>Administrador de proyectos</h1>
                <div className="container-subcontent">
                    <ListarPendientes editarFn={editar}></ListarPendientes>
                    <ListarInProgress></ListarInProgress>
                    <ListarCompletados eliminarFn={eliminar}></ListarCompletados>                                        
                </div>
                <div className='controles-main'>
                    <Link to={'/crear'}>
                        <Button color='primary'>Crear Proyecto</Button>
                    </Link>
                </div>
            </div>            
        </React.Fragment>
    )
}

export default MainProyectos;