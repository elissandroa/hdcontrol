import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Order } from './components/Order'
import { FormAddOs } from './components/FormAddOs'
import { Client } from './pages/Client'
import { Products } from './pages/Products'
import { UserProvider } from './context/UserContext'



function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/clients' element={<Client />} />
          <Route path='/products' element={<Products />} />
        </Routes>
       <Footer />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
