import './Home.css'
import {Orders} from './Orders';
import { orders } from '../mockDatabase/orders';

export const Home = () => {
  return (
    <div className='home-container'>
      <Orders orders={orders} />
    </div>
  )
}
