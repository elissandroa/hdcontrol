
import { useContext, useState } from "react";
import { OrderList } from "../components/OrderList";
import "./Orders.css";
import { Context } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import { FormAddOs } from "../components/FormAddOs";
import { FormChangeUserPassword } from "../components/FormChangeUserPassword";


export const Orders = ({ orders }) => {
  const { authenticated, admin } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [loadNew, setLoadNew] = useState(false);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setVisible(!visible);
    setLoadNew(!loadNew);
  }

  const onCloseFormUser = () => {
    setOpen(!open);
  }

  const updatedId = localStorage.getItem('userId');
  return (


    <div className="orders-container">
      <div className='button-add-order-service'>
        {visible && <FormAddOs onClose={onClose} />}
        {!admin && orders.length === 0 && <div className="text-orders-not-found">
          <h2>Não há Ordems de Serviço em execução no momento...</h2>
        </div>}
        {open && <FormChangeUserPassword onCloseFormUser={onCloseFormUser} updateId={updatedId} />}
        {!admin && <button className="user-pass-icon" onClick={() => setOpen(!open)}><GoPasskeyFill /></button>}
        {orders ? admin && <button onClick={() => setVisible(!visible)}><FaPlusCircle /></button> : "Não há Ordems de Serviço em execução no momento!"}
      </div>
      {authenticated && orders.length > 0 && < OrderList orders={orders} loadNew={loadNew} />}
    </div>
  );
};
