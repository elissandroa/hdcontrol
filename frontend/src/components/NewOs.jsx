import { useState } from "react";
import { OrderItem } from "./OrderItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewOs.css";
import { CgAdd } from "react-icons/cg";
import { RiSave3Fill } from "react-icons/ri";


export const NewOs = ({ clients, products }) => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);
  const [client, setClient] = useState("");
  const navigate = useNavigate();
  const [render, setRender] = useState(0);

  let amount = 0;

  const addItem = (e) => {
    e.preventDefault();
    if (!price || !quantity) return;
    if (description === "") return;
    if (!client && client !== "Informe o cliente") {
      alert("Informe o cliente");
      return;
    }
    setId((prev) => prev + 1);
    items.push({ id, quantity, description, price, service, notes });
    ResetOrdem();
  }


  const ResetOrdem = () => {
    setPrice("");
    setQuantity("");
    setDescription("");
    setService("");
    setNotes("");
  };


  const deleteItem = (index) => {
    const itemsAfterDeleted = items.filter((item) => item.id !== index);
    setItems(itemsAfterDeleted);
    ResetOrdem();
    setCount((prev) => prev - 1);
  }

  const totalAmount = () => {
    let total = 0;
    if (items) {
      items.forEach((item) => {
        total += (item.quantity * item.price);
      })
      amount = total;
    }
    return amount;
  }


  const createOrder = async (e) => {
    e.preventDefault();
    if (client) {
      totalAmount();
      const order = {
        client: client,
        amount: amount,
        data_entrega: "pendente",
        status: "pendente",
        payed: false,
        items: items
      }
      axios.post("http://localhost:8000/orders/", order);
      navigate('/');
    } else {
      alert("Informe o cliente");
    }
  }





  return (

    <div className="newos-container">
      <form>
        <div className="form-container">
          <div className="input-label-container">
            <div>
              <label htmlFor="cliente">Cliente:</label>
            </div>
            <div>
              <select name="Client" id="client" onChange={(e) => setClient(e.target.value)}>
                <option defaultValue="Selecione um Cliente" className="option-client">Selecione um Cliente</option>
                {
                  clients && clients.map((client, key) => (
                    <option key={key} value={client.name}>{client.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="input-label-container">
            <div>
              <label htmlFor="quantity">Quantidade</label>
            </div>
            <div>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="input-label-container">
            <div>
              <label htmlFor="price">Preço:</label>
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="input-label-container">
            <div>
              <label htmlFor="service">Serviço:</label>
            </div>
            <div>
              <input
                type="text"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="fnt-12"
              />
            </div>
          </div>
          <div className="input-label-container">
            <div>
              <label htmlFor="notes">Observações:</label>
            </div>
            <div>
              <input
                type="text"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="fnt-12"
              />
            </div>
          </div>
          <div className="input-label-container">
            <div>
              <label htmlFor="product">Descrição</label>
            </div>
            <div>
              <select name="description" id="description" onChange={(e) => setDescription(e.target.value)}>
                <option selected>Selecione um produto</option>
                {
                  products && products.map((prod, key) => (
                    <option key={key} value={prod.description}>{prod.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="input-buttons-container">
            <div>
              <button className="addButton" onClick={addItem}><CgAdd /></button>
            </div>
            <div>
              <button className="saveButton" onClick={createOrder}><RiSave3Fill /></button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {items.length > 0 && (
          <OrderItem items={items} deleteItem={deleteItem} />
        )}
      </div>
    </div >
  )
}