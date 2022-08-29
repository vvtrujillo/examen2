import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';


const ListarCompletados = ({eliminarFn}) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/proyectosTerminados')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los proyectos en terminados',resp.data.datosProy)
                  setDatos(resp.data.datosProy); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }        
              })
    }, [])

    return(
        <div className='subcontent-comp'>
            <h1>Completados</h1>
            {
                datos.map((j,i) =>
                <Card key={i}>
                    <CardBody>
                        <CardTitle>{j.nombre}</CardTitle>
                        <CardSubtitle>fecha:{j.fechaVencimiento}</CardSubtitle>
                        <Button color='danger' onClick={e => eliminarFn(j)}>Eliminar Proyecto</Button>
                    </CardBody>
                </Card>
                )
            }
        </div>
    )
}

export default ListarCompletados;