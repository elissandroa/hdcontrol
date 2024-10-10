import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/UserContext';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authenticated } = useContext(Context);

  const navigate = useNavigate();


useEffect(() => {
  if(authenticated){
    navigate("/");
  }
},[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password
    }
    await login(loginData);
    navigate('/');
  }



  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <div className="input-container">
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={((e) => setPassword(e.target.value))}
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}
