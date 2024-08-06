
import { OrderList } from "../components/OrderList";
import "./Orders.css";
export const Orders = ({orders}) => {

  return (

    <div className="orders-container">
      {
        !orders ? <h2>Não há ordens de serviço em execução no momento.</h2>
        :<OrderList orders={orders} />
          
         
      }
    </div>
  );
};
