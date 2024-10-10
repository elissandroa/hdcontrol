import { useContext } from 'react'
import { FormProducts } from '../components/FormProducts'
import './Products.css'
import { Context } from '../context/UserContext'
export const Products = () => {
  const {authenticated} = useContext(Context);
  return (
    authenticated && <div className='products-container'>
      <FormProducts />
    </div>
  )
}
