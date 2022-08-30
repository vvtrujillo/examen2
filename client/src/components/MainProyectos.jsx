import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarCompletados from './Proyectos/ListarCompletados';
import ListarInProgress from './Proyectos/ListarInProgess';
import ListarPendientes from './Proyectos/ListarPendientes';
import {Link, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";



const MainProyectos = () => {
    
    const [recargar, setRecargar] = useState(false);
    const navigate = useNavigate();

    const [datos, setDatos] = useState([]);

    const [datosPro, setDatosPro] = useState([]);
    const [datosTerm, setDatosTerm] = useState([]);

    ///Parar cerrar la sesion del usuario
    const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    }

    const eliminar = (proyecto) => {
        Swal.fire({
            text: `Seguro que desea eliminar el proyecto: ${proyecto.nombre}?`,
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
                            let nuevoDatos = datos.filter((dato)=>{
                                return dato._id != proyecto._id
                            }) 
                            setDatosTerm(nuevoDatos);                           
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

    const moverProyectosaProgress = (objPro) => {
        objPro.estado='ejecucion';
        axios.put(`http://localhost:8000/api/v1/proyectos/${objPro._id}`, objPro)
            .then(resp => {
                if(!resp.data.error) {
                    let nuevoDatos = datos.filter((dato)=>{
                        return dato._id != objPro._id
                    })
                    setDatos(nuevoDatos);            
                    setDatosPro([...datosPro, objPro])                    
                } else {
                    console.log(resp.data);
                    Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                    return false;
                }
            })        
    }

    const moverProyectosaTerm = (objPro) => {
        objPro.estado='terminado';
        axios.put(`http://localhost:8000/api/v1/proyectos/${objPro._id}`, objPro)
            .then(resp => {
                if(!resp.data.error) {
                    let nuevoDatos = datosPro.filter((dato)=>{
                        return dato._id != objPro._id
                    })
                    setDatosPro(nuevoDatos);            
                    setDatosTerm([...datosTerm, objPro])                    
                } else {
                    console.log(resp.data);
                    Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                    return false;
                }
            })        
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/proyectosCreados')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los proyectos creados',resp.data.datosProy)
                  setDatos(resp.data.datosProy); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
              })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/proyectosEjecucion')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los proyectos en ejecucion',resp.data.datosProy)
                  setDatosPro(resp.data.datosProy); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
              })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/proyectosTerminados')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los proyectos en terminados',resp.data.datosProy)
                  setDatosTerm(resp.data.datosProy); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
              })
    }, [])

    return(
        <React.Fragment>            
            <div className='main-comp'>
                <h1>Administrador de proyectos</h1>
                <div className="container-subcontent">
                    <ListarPendientes editarFn={editar} datos={datos} setDatos={setDatos} moverProyectosaProgressFn={moverProyectosaProgress}></ListarPendientes>
                    <ListarInProgress datosPro={datosPro} setDatosPro={setDatosPro} moverProyectosaTermFn={moverProyectosaTerm}></ListarInProgress>
                    <ListarCompletados eliminarFn={eliminar} datosTerm={datosTerm}></ListarCompletados>                     
                </div>
                <div className='controles-main'>
                    <Link to={'/crear'}>
                        <Button color='primary'>Crear Proyecto</Button>
                    </Link>
                    <Button color='danger' onClick={salir}>Salir</Button>
                </div>                
            </div>            
        </React.Fragment>
    )
}

export default MainProyectos;