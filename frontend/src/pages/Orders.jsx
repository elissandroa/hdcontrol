
import { OrderList } from "../components/OrderList";
import "./Orders.css";
export const Orders = ({ orders }) => {

  return (


    <div className="orders-container">
      <h2>Relação de ordens de serviço em execução</h2>
      {orders.length > 0 && < OrderList orders={orders} />}
    </div>
  );
};
