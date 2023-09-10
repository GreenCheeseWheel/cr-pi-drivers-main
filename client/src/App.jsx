import React from 'react'
import './App.css'
import Landing from './components/Landing/Landing'
import {Routes, Route, useParams, useNavigate} from "react-router-dom"
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import DriverDetail from './components/DriverDetail/DriverDetail'
import Form from './components/Form/Form'

import { getAllDrivers } from './redux/actions'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm/LoginForm'

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    if(!document.cookie.includes("email-drivers"))
    {
      navigate('/login');
    }
    else 
    {
      dispatch(getAllDrivers());
      setIsLogged(true);
    }

  }, []);

  return (
    <>
     {
      isLogged && <Nav />
     }
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/driver/:name' element={<DriverDetail />} />
      <Route path='/create' element={<Form />} />
      <Route path='/update/:id' element={<Form />} />
      <Route path='/login' element={<LoginForm setIsLogged={setIsLogged}/>}/>
    </Routes>
    </>
  )
}

export default App
