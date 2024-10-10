import { useContext, useState } from 'react'
import './Client.css'
import { useEffect } from 'react';
import axios from 'axios';
import { FormClient } from '../components/FormClient';
import { Context } from '../context/UserContext';


export const Client = () => {
  const [clients, setClients] = useState([]);
  const { authenticated} = useContext(Context);

  useEffect(() => {
    const getClients = async () => {
      await axios.get("http://localhost:5000/api/users")
        .then((response) => setClients(response.data));
    }

    getClients();
  }, [])


  return (
    authenticated && <div className="clients-container">
      <FormClient />
    </div>
  )
}
