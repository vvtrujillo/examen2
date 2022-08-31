import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import ListarPirates from './Pirates/ListarPirates';


const MainPirates = () => {

    const [datos, setDatos] = useState([]); //Datos Piratas
    const [recargar, setRecargar] = useState(false);
    const navigate = useNavigate();

    ///Parar cerrar la sesion del usuario
    const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    }

    const eliminar = (pirate) => {
        Swal.fire({
            text: `Seguro que desea eliminar a ${pirate.nombre}?`,
            title: 'Eliminar',
            showCancelButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, me equivoqué!!!',
            cancelButtonColor:'green'
        }).then(resp => {
            if(resp.isConfirmed) {
                axios.delete(`/api/v1/pirates/${pirate._id}`)
                .then(respuesta => {
                    if(!respuesta.data.error) {
                        Swal.fire('Exito','Se ha eliminado el pirata','success');
                        let nuevoDatos = datos.filter((dato)=>{
                            return dato._id != pirate._id
                        }) 
                        setDatos(nuevoDatos);                           
                    } else {
                        Swal.fire('Ooops!!!', respuesta.data.mensaje, 'error');
                    }
                });
            }
        })
    }

    useEffect(() => {
        axios.get(('/api/v1/pirates'))
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
            <div className='main-pirate'>
                <div className='main-pirate-title'>
                    <h1>Main Pirates</h1>
                    <Link to='/crear'>
                        <Button color='primary'>Crear Pirata</Button>
                    </Link>
                    <Button color='danger' onClick={salir}>Cerrar sesión</Button>
                </div>
                <ListarPirates datos={datos} eliminarFn={eliminar}></ListarPirates>
            </div>            
        </React.Fragment>
    )
}

export default MainPirates;