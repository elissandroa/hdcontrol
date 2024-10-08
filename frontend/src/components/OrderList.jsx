import { useEffect, useState } from "react";
import "./OrderList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineFolderOpen } from "react-icons/ai";

export const OrderList = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/orders")
      .then((response) => setOrders(response.data));
    setOrders(ordersLessPayment);
  }, [])

  let ordersFilter = orders;
  let ordersLessPayment = ordersFilter.filter((ordem) => ordem.payed !== true);
 if(!ordersLessPayment) {
  <p>carregando ...</p>
 }
  return (
    ordersLessPayment.length > 0 && <div className="order-container">
      <h2>Relação de ordens de serviço em execução</h2>
      <table className="table-container">
        <thead>
          <tr className="th-container">
            <th>O.S</th>
            <th>Cliente</th>
            <th className='td-width-60'>Total</th>
            <th>Status</th>
            <th>Abrir</th>
          </tr>
        </thead>
        <tbody className="tbody-container">
          {orders &&
            ordersLessPayment.map((order, key) => (

              <tr key={key}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td><span>R$ </span>{parseFloat(order.amount).toFixed(2)}</td>
                <td>{order.status}</td>
                <Link to={`/order/${order.id}`} ><td className="order-list-link"><AiOutlineFolderOpen /></td></Link>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
