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
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((prodItem, key) => (
                        <tr key={key}>
                            <td>{prodItem[1]}</td>
                            <td>{prodItem[2]}</td>
                            <td>R$ {parseFloat(prodItem[3]).toFixed(2)}</td>
                            <td> R$ {(prodItem[1] * prodItem[3]).toFixed(2)}</td>
                            <td>{prodItem[4]}</td>
                            <td>{prodItem[5]}</td>
                            <td onClick={() => deleteItem(prodItem[1])}>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
