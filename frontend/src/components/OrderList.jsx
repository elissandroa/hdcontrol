import { useState } from "react";
import "./OrderList.css";

export const OrderList = ({ orders }) => {
  const [pedido, setPedido] = useState(orders);

  return (
    <div className="order-container">
      <table>
        <thead>
          <tr className="th-container">
            <th>O.S</th>
            <th>Cliente</th>
            <th>Fornecedor</th>
            <th>Valor Total</th>
            <th>Data da Entrega</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="tbody-container">
          {pedido &&
            pedido.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.client}</td>
                <td>{order.amount}</td>
                <td>{order.data_entrega}</td>
                <td>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
