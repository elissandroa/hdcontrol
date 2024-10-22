import { useEffect, useState } from 'react';
import './FormAddItem.css';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'

export const FormAddItem = ({ id, OnSaveEdit }) => {
    const [description, setDescription] = useState([]);
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [servicing, setServicing] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(true);
 
    const navigate = useNavigate();
    let itemsEdit;


    useEffect(() => {
        const getData = async () => {
            await api.get(`/order/orders/${id}`)
                .then((response) => setOrder(response.data));
            await api.get("/prod/products")
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
        const itemAdd = {
            "id": order.items.length,
            "quantity": quantity,
            "description": description,
            "price": price,
            "servicing": servicing,
            "notes": notes
        }
        if (!order) return;
        const item = itemAdd;
        if (![order.items][0]) return;
        [order.items][0].push(item);
        itemsEdit = order.items;
        insertItem();

    }

    const insertItem = async () => {
        const newOrder = {
            client: order.client,
            data_entrega: order.data_entrega,
            status: order.status,
            payed: order.payed,
            items: order.items
        }
        await axios.patch(`/order/orders/${id}`, newOrder);
        await axios.get(`/order/orders/${id}`)
        .then((response) => setOrder(response.data));
        setVisible(false);
    }


    const buttonAdicionar = () => {
        alert("Adicionado!");
    }



    return (
        <form className='os-edit-container' onSubmit={handleSubmitNewItem}>
            <h1>A</h1>
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
                    value={servicing}
                    onChange={(e) => setServicing(e.target.value)}
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
                <button className='btnNewItem'>Adicionar</button>
            </div>
        </form>
    )
}
