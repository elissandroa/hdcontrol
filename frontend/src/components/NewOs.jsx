import { useState } from "react";
import { OrderItem } from "./OrderItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewOs.css";

export const NewOs = ({ clients, products }) => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setId] = useState(0);
  const [setCount] = useState(0);
  const [order, setOrder] = useState(null);
  const [client, setClient] = useState("");

  const navigate = useNavigate();

  const addItem = (e) => {
    e.preventDefault();
    if (!price || !quantity) return;
    if (description === "") return;
    if (!client && client !== "Informe o cliente") {
      alert("Informe o cliente");
      return;
    }
    setId((prev) => prev + 1);
    items.push([id, quantity, description, price, service, notes]);
    ResetOrdem();
  };

  const ResetOrdem = () => {
    setPrice("");
    setQuantity("");
    setDescription("");
    setService("");
    setNotes("");
  };

  const deleteItem = (index) => {
    alert(index);
    const itemsAfterDeleted = items.filter((item) => item[1] !== index);
    setItems(itemsAfterDeleted);
    ResetOrdem();
    setCount((prev) => prev - 1);
  };

  const totalOrder = () => {
    let amount = 0;
    items &&
      items.forEach((item) => {
        amount += item[3] * item[1];
      });
    return amount;
  };

  const createOrder = (e) => {
    e.preventDefault();
    let value = totalOrder();
    if (client) {
      const newOrder = {
        client: client,
        amount: value,
        data_entrega: "pendente",
        status: "pendente",
        items: items,
      };
      setOrder(newOrder);
      if (order) {
        axios.post("http://localhost:8000/orders/", order);
        navigate("/");
      }
    } else {
      alert("Informe o cliente");
    }
  };

  return (
    <div className="newos-container">
      <form>
        <div className="form-container">
          <div className="input-label-container">
            <div>
              <label htmlFor="cliente">Cliente:</label>
            </div>
            <div>
              <select
                name="Client"
                id="client"
                onChange={(e) => setClient(e.target.value)}
              >
                <option selected className="option-client">
                  Selecione um Cliente
                </option>
                {clients &&
                  clients.map((client, key) => (
                    <option key={key} value={client.name}>
                      {client.name}
                    </option>
                  ))}
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
              <select
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              >
                <option selected>Selecione um produto</option>
                {products &&
                  products.map((prod, key) => (
                    <option key={key} value={prod.description}>
                      {prod.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="input-buttons-container">
            <div>
              <button onClick={addItem}>Add</button>
            </div>
            <div>
              <button onClick={createOrder}>Salvar</button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {items.length > 0 && (
          <OrderItem items={items} deleteItem={deleteItem} />
        )}
      </div>
    </div>
  );
};
