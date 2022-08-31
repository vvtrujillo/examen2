import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ListarPendientes = ({datos, setDatos, moverProyectosaProgressFn}) => {

    
    const [recargar, setRecargar] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();


    const editarProyecto = async (e, id) => {
        e.preventDefault();

        console.log('id: ',id);
        
        console.log('datos para actualizar: ', datos);
        
    }
    

    return(

        <React.Fragment>            
            <div className='subcontent-comp'>
                <div className='titulo-col-proy-pend'>
                    <h1>Pendientes</h1>
                </div>
                {
                    datos.map((j,i) =>
                    <Card key={i}>
                        <CardBody>
                            <CardTitle>{j.nombre}</CardTitle>
                            <CardSubtitle>fecha:{j.fechaVencimiento}</CardSubtitle>
                            <Button color='warning' onClick={() => moverProyectosaProgressFn(j)}>Comenzar proyecto</Button>
                        </CardBody>
                    </Card>
                    )
                }
            </div>
        </React.Fragment>        
    )
}

export default ListarPendientes;