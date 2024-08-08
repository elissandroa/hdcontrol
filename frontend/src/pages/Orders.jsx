
import { OrderList } from "../components/OrderList";
import "./Orders.css";
export const Orders = ({ orders }) => {

  return (


    <div className="orders-container">
<<<<<<< HEAD
      <h2>Relação de ordens de serviço em execução</h2>
      {orders.length > 0 && < OrderList orders={orders} />}
=======
      {
        !orders ? <h2>Não há ordens de serviço em execução no momento.</h2>
        :<OrderList orders={orders} />
          
         
      }
>>>>>>> dd049b075808b82d3c4d44f6a6f3fa771f4bda2b
    </div>
  );
};
