import { Container, FormGroup, Input, Label, Form, Button } from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';    


const estadoInicial = {
    nombre: '',
    fechaVencimiento: '',
    estado: 'creado'
}

const Formulario = ({CrearProyectoFn}) => {

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

    const guardarProyecto = async e => {
        e.preventDefault();
        let respuesta=false;

        if(!id){
            console.log('formulario crea',formulario);
            respuesta = await CrearProyectoFn(formulario);
            console.log('Crea Proyecto', formulario);
            setFormulario(estadoInicial);
        } else {
           
            console.log('Update Proyecto', formulario);
           
        }

        if(respuesta){            
            navigate('/');
        }
        
    }

    return(
        <Container>
            <Link to={'/'}>Volver al Dashboard</Link>
            <h1>Crear Proyecto</h1>
            <Form onSubmit={guardarProyecto}>
                <FormGroup>
                    <Label>Nombre Proyecto:</Label>
                    <Input type="text"
                           required
                           minLength={3}
                           placeholder='Nombre Proyecto...'
                           name='nombre'
                           value={formulario.nombre}
                           onChange={actualizarFormulario}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Fecha vencimiento:</Label>
                    <Input type="date"                           
                           required
                           name="fechaVencimiento"
                           value={formulario.fechaVencimiento}
                           onChange={actualizarFormulario}></Input>
                </FormGroup>                
                <Button type="submit" color="primary">Crear Proyecto</Button>
            </Form>
        </Container>
    )
}

export default Formulario;