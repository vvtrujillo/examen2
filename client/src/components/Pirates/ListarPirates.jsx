import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, Routes, Route} from 'react-router-dom';
import Pirates from './Pirates';

const ListarPirates = ({datosPi, eliminarFn}) => {

    const [datos, setDatos] = useState([]);

    {/** */}
    

    return(
        <React.Fragment>
            <div className='main-pirate-body'>
                {
                    datosPi.map((j,i) => 
                        <div className='content-pirate'>
                            <div className='content-pirate-left'>
                                <img src={j.linkimagen}></img>
                            </div>  
                            <div className='content-pirate-right'>
                                <h1>{j.nombre}</h1>
                                <Link to={`/revisarPirata/${j._id}`}>
                                    <Button color='primary'>Ver pirata</Button>
                                </Link>                                
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