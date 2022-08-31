import { Container, FormGroup, Input, Label, Form, Button, Option } from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';    


const estadoInicial = {
    nombre: '',
    crewposition: '',
    linkimagen: '',
    numcofres: 0,
    frase: '',
    pegleg: true,
    eyepatch: true,
    hookhand: true
}

const FormCrearPirate = () => {

    const [datos, setDatos] = useState([]);

    const [formulario, setFormulario] = useState(estadoInicial);

    const navigate = useNavigate();

    const {id} = useParams();

    const actualizarFormulario = ({target: {name, value}}) => {
        console.log('formulario',formulario)
        setFormulario({
            ...formulario,
            [name]: value            
        })
    }

    //Función para Crear
    const CrearPirata = (obj) => {

        return axios.post('http://localhost:8000/api/v1/pirates', obj)
        .then(resp => {
            if(!resp.data.error){
                setDatos([...datos, resp.data.datosPirate]);
                Swal.fire('','Se ha creado el pirata','success');
                return true;
            }else{
                Swal.fire('','No pudimos crear el pirata', 'error');
                return false;
            }        
        })
    }

    const guardarPirata = async e => {
        e.preventDefault();
        let respuesta=false;

        if(!id){
            console.log('formulario crea',formulario);
            respuesta = await CrearPirata(formulario);
            console.log('Crea Pirata', formulario);
            setFormulario(estadoInicial);
        } else {
           
            console.log('Update Proyecto', formulario);
           
        }

        if(respuesta){            
            navigate('/');
        }
        
    }

    return(
        <React.Fragment>
            <div className='main-pirate'>
                <div className='main-pirate-title'>
                    <h1>Add Pirate</h1>
                    <Link to='/'>
                        <Button color='primary'>Crew Board</Button>
                    </Link>                    
                </div>
                <div className="main-pirate-body">                    
                    <Form onSubmit={guardarPirata}>
                        <FormGroup>
                            <Label>Nombre:</Label>
                            <Input type="text"
                                placeholder="Nombre pirata...."
                                required
                                minLength={3}
                                name='nombre'
                                onChange={actualizarFormulario}
                                value={formulario.nombre}
                                ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Crew position</Label>
                            <Input type="select"
                                required
                                name='crewposition'
                                onChange={actualizarFormulario}
                                value={formulario.crewposition}>
                                <option></option>
                                <option>Captain</option>
                                <option>First Mate</option>                                
                                <option>Quarter Master</option>
                                <option>Boatswain</option>
                                <option>Powder Monkey</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Img Url</Label>
                            <Input type='text'
                                required
                                placeholder="colocar url de la imagen"
                                name='linkimagen'
                                onChange={actualizarFormulario}
                                value={formulario.linkimagen}
                                >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label># Treasures Chests: </Label>
                            <Input type='number'
                                required
                                maxLength={999}
                                name='numcofres'
                                onChange={actualizarFormulario}
                                value={formulario.numcofres}
                                >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Frase: </Label>
                            <Input type='textarea'
                                required
                                minLength={10}
                                placeholder='Indicar la frase....'
                                name='frase'
                                onChange={actualizarFormulario}
                                value={formulario.frase}
                                >
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="pegleg"
                                type="checkbox"
                                name='pegleg'/>
                                    {''}
                            <Label check>Peg Leg</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="eyepatch"
                                type="checkbox"
                                name='eyepatch'/>
                                    {''}
                            <Label check>Eye Patch</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="hookhand"
                                type="checkbox"
                                name='hookhand'/>
                                    {''}
                            <Label check>Hook Hand</Label>
                        </FormGroup>
                        <Button color="primary" type='submit'>Crear Pirata</Button>                        
                    </Form>
                    <Link to='/'>
                        <Button color='danger'>Cancelar</Button>
                    </Link> 
                </div>                
            </div>            

        </React.Fragment>
    )
}

export default FormCrearPirate;