import { useContext, useState } from 'react'
import './Client.css'
import { useEffect } from 'react';
import { FormClient } from '../components/FormClient';
import { Context } from '../context/UserContext';
import api from '../utils/api';


export const Client = () => {
  const [clients, setClients] = useState([]);
  const { authenticated} = useContext(Context);

  useEffect(() => {
    const getClients = async () => {
      await api.get("/users")
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
