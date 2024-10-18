import { useContext, useEffect, useState } from "react";
import "./OrderList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiDeleteBin5Line, RiH1 } from 'react-icons/ri';
import { Context } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";

export const OrderList = ({loadNew}) => {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [reload, setReload] = useState(false);
  
  const { admin } = useContext(Context);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/order/orders")
      .then((response) => setOrders(response.data));
    setOrders(ordersLessPayment);

  }, [reload, loadNew])

  const ordersFilter = orders;
  const user = orders.User; 
  const userId = localStorage.getItem('userId');

  let ordersLessPayment = !admin ? ordersFilter.filter((ordem) => (ordem.payed !== true) && (ordem.User.id == userId)) : ordersFilter;
  if (!ordersLessPayment) {
    <p>carregando ...</p>
  }


  const OnDelete = async (osId) => {
    await axios.delete(`http://localhost:5000/api/order/orders/${osId}`);
    setReload(!reload);
    navigate('/');
  }



  return (
    ordersLessPayment.length > 0 ? (<div className="order-container">
      <h2>Relação de ordens de serviço em execução</h2> 
      <table className="table-container">
        <thead>
          <tr className="th-container">
            <th>O.S</th>
            {admin && <th>Cliente</th>}
            <th className='td-width-60'>Total</th>
            <th>Status</th>
            <th>Abrir</th>
            {admin && <th>Excluir</th>}
          </tr>
        </thead>
        <tbody className="tbody-container">
          {orders &&
            ordersLessPayment.map((order, key) => (

              <tr key={key}>
                <td>{order.id}</td>
                {admin &&<td>{order.User.name}</td>}
                <td><span>R$ </span>{parseFloat(order.amount).toFixed(2)}</td>
                <td>{order.status}</td>
                <Link to={`/order/${order.id}`} ><td className="order-list-link"><AiOutlineFolderOpen /></td></Link>
                {admin && <td className='td-width-60 btn-delete' onClick={() => OnDelete(order.id)}><RiDeleteBin5Line /></td>}
              </tr>
            ))}
        </tbody>
      </table>
    </div>) : (<h2></h2>)
   
  );
};
