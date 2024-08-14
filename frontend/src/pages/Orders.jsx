
import { OrderList } from "../components/OrderList";
import "./Orders.css";
export const Orders = ({ orders }) => {

  return (


    <div className="orders-container">
      {orders.length > 0 && < OrderList orders={orders} />}
    </div>
  );
};
