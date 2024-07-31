import './Order.css'
import { useParams } from 'react-router-dom'
import { orders } from '../mockDatabase/orders';
import { useState } from 'react';

export const Order = () => {
    const { id } = useParams();
    const order = orders[id - 1];

    const totalOrder = () => {
        let total = 0;
        order.items.forEach((value) => {
           return total +=  (value.price * value.quantity);
        })
        return total;
    }

    return (
        <div className='order-container'>
            <div className='order-header'>
                <p>OS: {order.id}</p>
                <p>Cliente: {order.client}</p>
                <p>Valor: R$ {totalOrder().toFixed(2)}</p>
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
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                        <td>{order.client}</td>
                        <td>{item.price}</td>
                        <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                        <td>{order.data_entrega}</td>
                     </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}
