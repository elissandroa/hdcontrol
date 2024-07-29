import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="brand">
        <span className='hd-brand'>HD</span><span className='hd-brand-control'>Control</span> 
      </div>
      <div>
        <ul className='menu-right'>
          <li>Home</li>
          <li>Pedidos</li>
          <li>Clientes</li>
          <li>Produtos</li>
        </ul>
      </div>
    </nav>
  )
}
