import React, { useEffect, useState } from 'react'
import './FormEditItemOs.css'
import axios from 'axios';

export const FormEditItemOs = ({ onCloseEditForm, setUpdateStatus, updateStatus, itemForEdit, osId, indexId }) => {
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [service, setService] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState({});

    let amount;

    useEffect(() => {
        setQuantity(itemForEdit.quantity);
        setDescription(itemForEdit.description);
        setPrice(itemForEdit.price);
        setService(itemForEdit.service);
        setNotes(itemForEdit.notes);
        getOrder();
    }, [])

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


    const getOrder = async (editId) => {
        await axios.get(`http://localhost:8000/orders/${osId}`)
            .then((response) => setOrder(response.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderItem = {
            id: indexId,
            quantity,
            description,
            price,
            service,
            notes
        }
        for (let i = 0; i < order.items.length; i++) {
            if (order.items[i].id === indexId) {
                order.items[i] = orderItem;
            }
        }
        order.amount = totalAmount();
        axios.patch(`http://localhost:8000/orders/${osId}`, order);
        setUpdateStatus(!updateStatus);
        onCloseEditForm();
    }






    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="number"
                            name='quantity'
                            placeholder='Quantidade'
                            value={quantity || ""}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='description'
                            placeholder='Descrição do produto'
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name='price'
                            placeholder='Valor do produto'
                            value={price || ""}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='service'
                            placeholder='Descrição do serviço'
                            value={service || ""}
                            onChange={(e) => setService(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='notes'
                            placeholder='Observações'
                            value={notes || ""}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                        />
                    </div>
                    <div className='buttons-container'>
                        <button className='btnAdd'>Atualizar</button>
                        <button onClick={onCloseEditForm} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
