import { useEffect, useState } from 'react';
import './FormAddItemOs.css'
import api from '../utils/api';

export const FormAddItemOs = ({ onClose, setUpdateStatus, updateStatus, osId }) => {

    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [servicing, setServicing] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState([]);
    const [error, setError] = useState("");
    const [idItem, setIdItem] = useState(0);

    let amount;

    const getProducts = async () => {
        try {
            await api.get("/prod/products")
                .then((response) => setProducts(response.data));
        } catch (error) {
            console.log(error);
        }

    }
    const getOrder = async () => {
        try {
            await api.get(`/order/orders/${osId}`)
                .then((response) => setOrder(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    let itemsEdit = order.Products;


    const totalAmount = async () => {
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = await api.get(`/order/orders/${osId}`);
        delete newOrder.User;
        delete newOrder.createdAt;
        delete newOrder.updatedAt;
        delete newOrder.amount;
        delete newOrder.Products;
        delete newOrder.id;
        delete newOrder.status;
        if (description === "" || description === "Selecione um produto") {
            setError("Escolha um produto!");
            return;
        };

        const newItem = {
            UserId: order.UserId,
            idProduct: parseInt(description),
            idOrder: parseInt(osId),
            quantity: parseInt(quantity),
            price: parseFloat(price),
            servicing,
            notes
        }
        let items = [];

        for (let i = 0; i < itemsEdit.length; i++) {
            items.push(itemsEdit[i].OrderProduct);
        }
        items.push(newItem);
        newOrder.items = items;

        await insertItem(newOrder);
        setUpdateStatus((prev) => prev + 1);
        onClose();
    }
    async function insertItem(newOrder) {
        await api.patch(`/order/orders/${osId}`, newOrder);
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
                                    <option key={key} value={parseInt(prod.id)}>{prod.description}
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
                                name="price"
                                type="number"
                                placeholder='Valor'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="servicing"></label>
                        </div>
                        <div>
                            <input
                                name="servicing"
                                type="text"
                                placeholder='Serviço'
                                value={servicing}
                                onChange={(e) => setServicing(e.target.value)}
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
