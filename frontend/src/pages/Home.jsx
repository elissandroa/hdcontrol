import { useContext, useEffect, useState } from 'react';
import './Home.css'
import { Orders } from './Orders';
import axios from 'axios';
import { Context } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const { authenticated, admin } = useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:5000/api/order/orders")
      .then((response) => setOrders(response.data));
  }, [])

  return (
    authenticated && <div className='home-container'>
      <Orders orders={orders} />
    </div>
  )
}
