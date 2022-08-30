import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ListarInProgress = ({datosPro, setDatosPro, moverProyectosaTermFn}) => {    

    

    return(

        <div className='subcontent-comp'>
            <div className='titulo-col-proy-prog'>
                <h1>En Ejecución</h1>
            </div>            
            {
                datosPro.map((j,i) =>
                <Card key={i}>
                    <CardBody>
                        <CardTitle>{j.nombre}</CardTitle>
                        <CardSubtitle>fecha:{j.fechaVencimiento}</CardSubtitle>
                        <Button color='success' onClick={() => moverProyectosaTermFn(j)}>Finalizar Proyecto</Button>
                    </CardBody>
                </Card>
                )
            }
        </div>
    )
}

export default ListarInProgress;