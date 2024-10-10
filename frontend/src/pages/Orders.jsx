
import { useContext } from "react";
import { OrderList } from "../components/OrderList";
import "./Orders.css";
import { Context } from "../context/UserContext";
export const Orders = ({ orders }) => {
  const {authenticated } = useContext(Context);
  return (


    <div className="orders-container">
      {authenticated && orders.length > 0 && < OrderList orders={orders} />}
    </div>
  );
};
