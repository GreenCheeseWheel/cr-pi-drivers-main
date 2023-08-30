import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './components/Landing/Landing'
import {Routes, Route, useParams} from "react-router-dom"
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import DriverDetail from './components/DriverDetail/DriverDetail'
import Form from './components/Form/Form'

function App() {

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
