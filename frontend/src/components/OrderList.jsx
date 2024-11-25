import { useContext, useEffect, useState } from "react";
import "./OrderList.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiDeleteBin5Line, RiH1 } from 'react-icons/ri';
import { Context } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";
import api from "../utils/api";

export const OrderList = ({ loadNew }) => {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [reload, setReload] = useState(false);

  const { admin } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/order/orders")
      .then((response) => setOrders(response.data));
    setOrders(ordersLessPayment);

  }, [reload, loadNew])

  let userAdmin = false;

  const ordersFilter = orders;
  const user = orders.User;
  const userId = localStorage.getItem('userId');

  const roleId = localStorage.getItem('RoleId');


  if (roleId == 1) {
    userAdmin = true;
  }

  let ordersLessPayment = !userAdmin ? ordersFilter.filter((ordem) => (ordem.payed !== true) && (ordem.User.id == userId)) : ordersFilter;
  if (!ordersLessPayment) {
    <p>carregando ...</p>
  }


  const OnDelete = async (osId) => {
    await api.delete(`/order/orders/${osId}`);
    setReload(!reload);
    navigate('/');
  }

  const formatUpdatedAt = (dataToFormat) => {
    const year = dataToFormat.slice(0, 4);
    const month = dataToFormat.slice(5, 7);
    const day = dataToFormat.slice(8, 10);
    const hour = dataToFormat.slice(11, 13);
    const minutes = dataToFormat.slice(14, 16);
    const secounds = dataToFormat.slice(17, 19);
    return (day + "/" + month + "/" + year + " " + (hour - 3) + ":" + minutes + ":" + secounds);
  }



  return (
    ordersLessPayment.length > 0 ? (<div className="order-container">
      <h2>Relação de ordens de serviço em execução</h2>
      <table className="table-container">
        <thead>
          <tr className="th-container">
            <th>O.S</th>
            {userAdmin && <th>Cliente</th>}
            <th className='td-width-60'>Total</th>
            <th>Status</th>
            <th>Entrega</th>
            <th>Atualização</th>
            <th>Pagamento</th>
            <th>Abrir</th>
            {userAdmin && <th>Excluir</th>}
          </tr>
        </thead>
        <tbody className="tbody-container">
          {orders &&
            ordersLessPayment.map((order, key) => (

              <tr key={key}>
                <td>{order.id}</td>
                {userAdmin && order.User && <td>{order.User.name}</td>}
                <td><span>R$ </span>{parseFloat(order.amount).toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.dataEntrega}</td>
                <td>{formatUpdatedAt(order.updatedAt)}</td>
                <td>{order.payed == 1 ? "Pago" : "Pendente"}</td>
                <Link to={`/order/${order.id}`} ><td className="order-list-link"><AiOutlineFolderOpen /></td></Link>
                {userAdmin && <td className='td-width-60 btn-delete' onClick={() => OnDelete(order.id)}><RiDeleteBin5Line /></td>}
              </tr>
            ))}
        </tbody>
      </table>
    </div>) : (<h2></h2>)

  );
};