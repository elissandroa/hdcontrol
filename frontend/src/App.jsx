import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Order } from './components/Order'
import { Os } from './pages/Os'
import { Client } from './pages/Client'
import { Products } from './pages/Products'

function App() {
  const [auth] = useState(true);

  return (
    <BrowserRouter>
    {auth && <Navbar />}
      <Routes>
        <Route path='/' element={auth ? <Home /> : <Login />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/order_service' element={<Os />} />
        <Route path='/clients' element={<Client />} />
        <Route path='/products' element={<Products />} />
      </Routes>
     {auth && <Footer />}
    </BrowserRouter>
  )
}

export default App
