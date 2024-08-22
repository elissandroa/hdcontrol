import { useEffect, useState } from 'react';
import './FormAddItemOs.css'
import axios from 'axios';

export const FormAddItemOs = ({ onClose, setUpdateStatus, updateStatus, osId }) => {

    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [service, setService] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState([]);
    const [error, setError] = useState("");

    let amount;

    const getProducts = async () => {
        try {
            await axios.get("http://localhost:8000/products")
                .then((response) => setProducts(response.data));
        } catch (error) {
            console.log(error);
        }

    }
    const getOrder = async () => {
        try {
            await axios.get(`http://localhost:8000/orders/${osId}`)
                .then((response) => setOrder(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    let itemsEdit = order.items;

    const totalAmount = () => {
        let total = 0;
        if (!itemsEdit) return;
        itemsEdit.forEach((item) => {
            total += (item.quantity * item.price);
        })
        amount = total;

        return amount;
    }

    useEffect(() => {
        getProducts();
        getOrder();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(description === "" || description === "Selecione um produto") {
            setError("Escolha um produto!");
            return;
        };
        const newItem = {
            "id": order.items.length,
            "quantity": quantity,
            "description": description,
            "price": price,
            "service": service,
            "notes": notes
        }
        if (!order) return;
        const item = newItem;
        if (![order.items][0]) return;
        [order.items][0].push(item);
        insertItem();
    }

    const insertItem = async () => {
        const newOrder = {
            client: order.client,
            amount: totalAmount(),
            status: order.status,
            payed: order.payed,
            items: order.items
        }
        await axios.patch(`http://localhost:8000/orders/${osId}`, newOrder);
        setUpdateStatus((prev) => prev + 1);
        onClose();
    }


    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <div>
                            <label htmlFor="quantity"></label>
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder='Quantidade'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <select name="description" id="description" onChange={(e) => setDescription(e.target.value)} required>
                            <option selected>Selecione um produto</option>
                            {
                                products && products.map((prod, key) => (
                                    <option key={key} value={prod.description}>{prod.description}
                                    </option>
                                ))}
                        </select>
                        <p className='errorMail'>{error}</p>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="price"></label>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Valor'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="service"></label>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Serviço'
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="notes"></label>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Observações'
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='buttons-container'>
                        <div>
                            <button type='submit' className='btnAdd'>Adicionar</button>
                        </div>
                        <div>
                            <button className='btnCancel' onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
