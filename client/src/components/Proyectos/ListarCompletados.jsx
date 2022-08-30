import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';


const ListarCompletados = ({eliminarFn, datosTerm}) => {

    const [datos, setDatos] = useState([]);    

    return(
        <div className='subcontent-comp'>
            <div className='titulo-col-proy-comp'>
                <h1>Completados</h1>    
            </div>        
            {
                datosTerm.map((j,i) =>
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