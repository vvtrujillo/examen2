import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ListarPendientes = ({editarFn}) => {

    const [datos, setDatos] = useState([]);
    const [recargar, setRecargar] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

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


    const editarProyecto = async (e, id) => {
        e.preventDefault();

        console.log('id: ',id);
        
        console.log('datos para actualizar: ', datos);
        
    }
    

    return(

        <React.Fragment>            
            <div className='subcontent-comp'>
                <h1>Pendientes</h1>
                {
                    datos.map((j,i) =>
                    <Card key={i}>
                        <CardBody>
                            <CardTitle>{j.nombre}</CardTitle>
                            <CardSubtitle>fecha:{j.fechaVencimiento}</CardSubtitle>
                            <Button color='warning' onClick={editarProyecto}>Comenzar proyecto</Button>
                        </CardBody>
                    </Card>
                    )
                }
            </div>
        </React.Fragment>        
    )
}

export default ListarPendientes;