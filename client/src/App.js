import './App.css';
import { Container } from 'reactstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/registro/login';
import Registro from './components/registro/registro';
import UserContext from './components/contextos/user-context';
import { useEffect, useState } from 'react';
import Formulario from './components/Proyectos/Formulario';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainProyectos from './components/MainProyectos';
import MainPirates from './components/MainPirates';
import FormCrearPirate from './components/Pirates/FormCrearPirate';

function App() {

  const navigate = useNavigate();   
  const [usuario, setUsuario] = useState();


  useEffect(() => {
    if(!usuario) {
      if(sessionStorage.getItem('USUARIO')){
        setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
      }else {
        navigate('/login');
      }
    } else {
      sessionStorage.setItem('USUARIO', JSON.stringify(usuario));
    }
  }, [])

  return (

    <UserContext.Provider value={{usuario, setUsuario}}>
      <Container>

        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registro' element={<Registro />}></Route>
          <Route path='/*' element={<MainPirates />}></Route>
          <Route path='crear' element={<FormCrearPirate />}></Route>
        </Routes>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
