import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'

function App() {
  const [auth] = useState(true);

  return (
    <BrowserRouter>
    {auth && <Navbar />}
      <Routes>
        <Route path='/' element={auth ? <Home /> : <Login />} />
      </Routes>
     {auth && <Footer />}
    </BrowserRouter>
  )
}

export default App
