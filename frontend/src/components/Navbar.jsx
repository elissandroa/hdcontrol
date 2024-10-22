import { Link } from 'react-router-dom'
import './Navbar.css'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/UserContext'
import useAuth from '../hooks/useAuth'
import api from '../utils/api'

export const Navbar = () => {
  const { authenticated, admin, logout } = useContext(Context);
  const roleId = localStorage.getItem('RoleId');

  let userAdmin = false;

  if(roleId == 1) {
    userAdmin = true;
  }
  
  return (
    
   
    authenticated && <nav className="nav-container">
      <div className="brand">
        <Link to={'/'}><span className='hd-brand'>HD</span><span className='hd-brand-control'>Control</span></Link>
      </div>
      <div>
        <ul className='menu-right'>
          <li><Link to={'/'}>Home</Link></li>
          {userAdmin && <li><Link to={'/clients'}>Clientes</Link></li>}
          {userAdmin && <li><Link to={'/products'}>Produtos</Link></li>}
          <li onClick={() => logout()}><Link>Sair</Link></li>
        </ul>
      </div>
    </nav>
  )
}
