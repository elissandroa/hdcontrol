import { useContext } from 'react'
import './Footer.css'
import { Context } from '../context/UserContext'

export const Footer = () => {
  const {authenticated} = useContext(Context);

  return (
  authenticated && <div className='footer'>
      <p>Software Desenvolvido por Elissandro para controle de serviço em HDs.</p>
    </div>
  )
}
