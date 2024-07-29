import { Order } from "../components/Order"
import { orders } from "../mockDatabase/orders"
import './Orders.css'
export const Orders = () => {
  return (
    <div className="orders-container">
      <h2>Relação de ordens de serviço em execução</h2>
      <Order orders={orders}/>
    </div>
  )
}
