import { useEffect, useState } from 'react';
import './FormAddItem.css';
import axios from 'axios';

export const FormAddItem = ({id}) => {
    const [description, setDescription] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [service, setService] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);

   
    useEffect(() => {
        axios.get(`http://localhost:8000/orders/${id}`)
        .then((response) => setOrder(response.data));
        axios.get("http://localhost:8000/products")
        .then((response) => setProducts(response.data));
    }, [])


   let lista = [order.items];
   const newId = lista.length + 1;
   lista.push([[newId, quantity, description, price, service, notes]]);

   
console.log(lista);



    return (
        <form className='os-edit-container'>
            <div>
                <input
                    type="number"
                    placeholder='Quantidade'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder='Preço'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div>
                <input type="text"
                    placeholder='Serviço'
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Informações'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
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
            <div>
                <button>Adicionar</button>
            </div>
        </form>
    )
}
