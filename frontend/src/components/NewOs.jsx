import { useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewOs.css";
import { CgAdd } from "react-icons/cg";
import { RiSave3Fill } from "react-icons/ri";


export const NewOs = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [servicing, setServicing] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState("");
  const [render, setRender] = useState(0);
  const [client, setClient] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();




  useEffect(() => {
    const LOCAL_URL = "http://localhost:5000/api";
    axios.get(`${LOCAL_URL}/users`)
      .then((response) => setUsers(response.data));

    axios.get(`${LOCAL_URL}/prod/products`)
      .then((response) => setProducts(response.data));
  }, [])

  let amount = 0;


  const addItem = (e) => {
    e.preventDefault();
    if (!price || !quantity) return;
    if (description === "") return;
    if (!client && client !== "Informe o cliente") {
      alert("Informe o cliente");
      return;
    }
    const itemDesc = description.split(',');
    setId((prev) => prev + 1);
    items.push({ id, idProduct: itemDesc[0], prodDesc: itemDesc[1], idOrder: 'idorder', quantity, price, servicing, notes });
    ResetOrdem();
  }


  const ResetOrdem = () => {
    setPrice("");
    setQuantity("");
    setDescription("");
    setServicing("");
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
      const order = {
        UserId: client,
        amount,
        dataEntrega: "pendente",
        status: "pendente",
        payed: false,
        items: items
      }
      await axios.post("http://localhost:5000/api/order/orders", order);
      navigate('/');
    } else {
      alert("Informe o cliente");
    }
  }





  return (

    <div className="newos-container">
      <form onSubmit={createOrder}>
        <div className="form-container">
          <div className="input-label-container">
            <div>
              <label htmlFor="cliente">Cliente:</label>
            </div>
            <div>
              <select name="Client" id="client" onChange={(e) => setClient(e.target.value)}>
                <option defaultValue="Selecione um Cliente" className="option-client">Selecione um Cliente</option>
                {
                  users && users.map((client, key) => (
                    <option key={key} value={client.id}>{client.name}</option>
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
              <label htmlFor="servicing">Serviço:</label>
            </div>
            <div>
              <input
                type="text"
                name="servicing"
                value={servicing}
                onChange={(e) => setServicing(e.target.value)}
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
                    <option key={key} value={`${prod.id},${prod.description}`}>{prod.description}
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