import { useEffect, useState } from 'react';
import './FormAddItem.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FormAddItem = ({ id, OnSaveEdit }) => {
    const [description, setDescription] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [service, setService] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(order.amount);

    const navigate = useNavigate();
    let itemsEdit;


    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8000/orders/${id}`)
                .then((response) => setOrder(response.data));
            await axios.get("http://localhost:8000/products")
                .then((response) => setProducts(response.data));
        }
        getData();
    }, [])

    const totalAmount = () => {
        let total = 0;
        if (itemsEdit) {
            itemsEdit.forEach((item) => {
                total += (item.quantity * item.price);
            })
            return total;
        }
        setAmount(total);
    }

    const handleSubmitNewItem = (e) => {
        e.preventDefault();
         const itemAdd = {
            "id": order.items.length,
            "quantity": quantity,
            "description": description,
            "price": price,
            "service": service,
            "notes": notes
        }
        if (!order) return;
        const item = itemAdd;
        if (!item) return;
        if (![order.items][0]) return;
        [order.items][0].push(item);
        itemsEdit = order.items;
        insertItem();
        
    }

    const insertItem = async () => {
        const newOrder = {
            client: order.client,
            amount: amount,
            data_entrega: order.data_entrega,
            status: order.status,
            payed: order.payed,
            items: order.items
        }
        setOrder(newOrder);
        if (order) {
            await axios.put(`http://localhost:8000/orders/${id}`, order);
        }
        navigate(`/`);
    }


    const buttonAdicionar = () => {
        alert("Adicionado!");
    }



    return (
        <form className='os-edit-container' onSubmit={handleSubmitNewItem}>
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
            <button>Adicionar</button>
        </form>
    )
}
