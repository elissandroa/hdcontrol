import { OrderList } from "../components/OrderList";
import { orders } from "../mockDatabase/orders";
import "./Orders.css";
export const Orders = () => {
  return (
    <div className="orders-container">
      <h2>Relação de ordens de serviço em execução</h2>
      <OrderList orders={orders} />
    </div>
  );
};
