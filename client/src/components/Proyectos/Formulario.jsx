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

const Formulario = () => {

    const [datos, setDatos] = useState([]);

    const [formulario, setFormulario] = useState(estadoInicial);

    const navigate = useNavigate();

    const {id} = useParams();

    //Función para Crear
    const CrearProyecto = (obj) => {

        return axios.post('http://localhost:8000/api/v1/proyectos', obj)
        .then(resp => {
            if(!resp.data.error){
            setDatos([...datos, resp.data.datosJug]);
            Swal.fire('','Se ha creado el proyecto','success');
            return true;
            }else{
            Swal.fire('','No pudimos crear el proyecto', 'error');
            return false;
            }        
        })
    }
    

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
            respuesta = await CrearProyecto(formulario);
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