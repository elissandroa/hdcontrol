import './Order.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});


    useEffect(() => {

        axios.get(`http://localhost:8000/orders/${id}`)
            .then((response) => setOrder(response.data));

    }, [])

    return (

        order && <div className='order-container'>
            <div className='order-header'>
                <p>OS: {order.id}</p>
                <p>Cliente: {order.client}</p>
                <p>Valor: R$ {parseFloat((order.amount)).toFixed(2)} </p>
                <button>Editar</button>
                <button>Excluir</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Fornecedor</th>
                        <th>Un</th>
                        <th>Total</th>
                        <th>Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items && order.items.map((item, key) => (
                        <tr key={key}>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{order.client}</td>
                            <td>{item[3]}</td>
                            <td>R$ {(item[1] * item[3]).toFixed(2)}</td>
                            <td>{order.data_entrega}</td>
                            <td>{item[0]}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}
