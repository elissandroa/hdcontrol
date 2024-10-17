import { RiDeleteBin5Line } from 'react-icons/ri'
import './OrderItem.css'

export const OrderItem = ({ items, deleteItem }) => {
    return (
        <div className="order-item-container">
            <table>
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Total</th>
                        <th>Serviço</th>
                        <th>Observações</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((prodItem, key) => (
                        <tr key={key}>
                            <td>{prodItem.quantity}</td>
                            <td>{prodItem.prodDesc}</td>
                            <td>R$ {parseFloat(prodItem.price).toFixed(2)}</td>
                            <td> R$ {(prodItem.quantity * prodItem.price).toFixed(2)}</td>
                            <td>{prodItem.servicing}</td>
                            <td>{prodItem.notes}</td>
                            <td className='td-delete' onClick={() => deleteItem(prodItem.id)}><RiDeleteBin5Line /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
