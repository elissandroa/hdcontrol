import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="brand">
        <Link to={'/'}><span className='hd-brand'>HD</span><span className='hd-brand-control'>Control</span></Link>
      </div>
      <div>
        <ul className='menu-right'>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/order_service'}>Nova O.S</Link></li>
          <li><Link to={'/clients'}>Clientes</Link></li>
          <li><Link to={'/products'}>Produtos</Link></li>
        </ul>
      </div>
    </nav>
  )
}
