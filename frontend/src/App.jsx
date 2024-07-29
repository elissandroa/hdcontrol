import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'

function App() {
  const [count, setCount] = useState(0)
  const [auth, setAuth] = useState(true);

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
