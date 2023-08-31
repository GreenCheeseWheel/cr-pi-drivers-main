import React from 'react'
import './App.css'
import Landing from './components/Landing/Landing'
import {Routes, Route, useParams} from "react-router-dom"
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import DriverDetail from './components/DriverDetail/DriverDetail'
import Form from './components/Form/Form'

import { getAllDrivers } from './redux/actions'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  return (
    <>
    <Nav />

    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/driver/:name' element={<DriverDetail />} />
      <Route path='/create' element={<Form />} />
    </Routes>
    </>
  )
}

export default App
