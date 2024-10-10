import { Link } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { Context } from '../context/UserContext'

export const Navbar = () => {
  const { authenticated, admin, logout } = useContext(Context);

  return (
    authenticated && <nav className="nav-container">
      <div className="brand">
        <Link to={'/'}><span className='hd-brand'>HD</span><span className='hd-brand-control'>Control</span></Link>
      </div>
      <div>
        <ul className='menu-right'>
          <li><Link to={'/'}>Home</Link></li>
          {admin && <li><Link to={'/order_service'}>Nova O.S</Link></li>}
          {admin && <li><Link to={'/clients'}>Clientes</Link></li>}
          {admin && <li><Link to={'/products'}>Produtos</Link></li>}
          <li onClick={() => logout()}><Link>Sair</Link></li>
        </ul>
      </div>
    </nav>
  )
}
