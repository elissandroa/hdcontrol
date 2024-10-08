import { useState } from 'react'
import './Client.css'
import { useEffect } from 'react';
import axios from 'axios';
import { FormClient } from '../components/FormClient';


export const Client = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      await axios.get("http://localhost:5000/api/users")
        .then((response) => setClients(response.data));
    }

    getClients();
  }, [])


  return (
    <div className="clients-container">
      <FormClient />
    </div>
  )
}
