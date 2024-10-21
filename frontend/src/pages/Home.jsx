import { useContext, useEffect, useState } from 'react';
import './Home.css'
import { Orders } from './Orders';
import { Context } from '../context/UserContext';
import { FormAddOs } from '../components/FormAddOs';
import api from '../utils/api';

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const { authenticated, admin } = useContext(Context);


  useEffect(() => {
    api.get("/order/orders")
      .then((response) => setOrders(response.data));
  }, [])


  return (
    authenticated && <div className='home-container'>
      <Orders orders={orders} />
    </div>
  )
}
