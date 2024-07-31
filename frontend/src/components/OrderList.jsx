import { useState } from "react";
import "./OrderList.css";
import { Link } from "react-router-dom";
export const OrderList = ({ orders }) => {
  const [pedido, setPedido] = useState(orders);

  const totalOrder = () => {
    let total = 0;
    pedido.items.forEach((value) => {
      return total += (value.price * value.quantity);
    })
    return total;
  }


  return (
    <div className="order-container">
      <table>
        <thead>
          <tr className="th-container">
            <th>O.S</th>
            <th>Cliente</th>
            <th>Fornecedor</th>
            <th>Data da Entrega</th>
            <th>Status</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody className="tbody-container">
          {pedido &&
            pedido.map((order, key) => (
              <tr key={key}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.client}</td>
                <td>{order.data_entrega}</td>
                <td>{order.status}</td>
                <td className="order-list-link"><Link to={`/order/${order.id}`}>Abrir</Link></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
