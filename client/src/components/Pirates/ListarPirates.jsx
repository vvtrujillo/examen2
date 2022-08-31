import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ListarPirates = ({datos, eliminarFn}) => {

    return(
        <React.Fragment>
            <div className='main-pirate-body'>
                {
                    datos.map((j,i) => 
                        <div className='content-pirate'>
                            <div className='content-pirate-left'>
                                <img src={j.linkimagen}></img>
                            </div>
                            <div className='content-pirate-right'>
                                <h1>{j.nombre}</h1>
                                <Button color='primary'>Ver pirata</Button>
                                <Button color='danger' onClick={e => eliminarFn(j)}>Eliminar pirata</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default ListarPirates;