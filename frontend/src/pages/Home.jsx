import { useEffect, useState } from 'react';
import './Home.css'
import { Orders } from './Orders';
import axios from 'axios';

export const Home = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/orders")
      .then((response) => setOrders(response.data));
  }, [])

  return (
    <div className='home-container'>
      <Orders orders={orders} />
    </div>
  )
}
