import './Login.css'
export const Login = () => {
  return (
    <div className="login-container">
        <h1>Login</h1>
        <div className="input-container">
        <div>
            <input 
            type="text" 
            name="login"
            placeholder="Digite seu email"
            />
        </div>
        <div>
            <input 
            type="password" 
            name="password"
            placeholder="Digite sua senha"
            />
        </div>
        <button type="submit">Entrar</button>
        </div>
    </div>
  )
}
