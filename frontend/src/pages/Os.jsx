import './Os.css'
import { NewOs } from '../components/NewOs'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Os = () => {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const LOCAL_URL = "http://localhost:8000";

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`${LOCAL_URL}/products`)
                .then((response) => setProducts(response.data));
    
        }

        const getClients = async () => {
            const res = await axios.get(`${LOCAL_URL}/clients`)
                .then((response) => setClients(response.data));
        }
        getClients();
        getProducts();
    }, [])

    return (
        <div className='os-container'>
            <h2>Ordem de Serviço</h2>
            <NewOs clients={clients} products={products} />
        </div>
    )
}
