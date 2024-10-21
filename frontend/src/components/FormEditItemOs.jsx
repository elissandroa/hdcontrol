import React, { useEffect, useState } from 'react'
import './FormEditItemOs.css'
import api from '../utils/api';

export const FormEditItemOs = ({ onCloseEditForm, setUpdateStatus, updateStatus, itemForEdit, osId, indexId }) => {
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [servicing, setServicing] = useState("");
    const [notes, setNotes] = useState("");
    const [order, setOrder] = useState({});
    const [idOrder, setIdOrder] = useState("");
    const [idProduct, setIdProduct] = useState("");


    let amount;

    useEffect(() => {
        setQuantity(itemForEdit.OrderProduct.quantity);
        setDescription(itemForEdit.description);
        setPrice(itemForEdit.OrderProduct.price);
        setServicing(itemForEdit.OrderProduct.servicing);
        setNotes(itemForEdit.OrderProduct.notes);
        setIdProduct(itemForEdit.OrderProduct.idProduct);
        getOrder();
      }, [updateStatus])

    let itemsEdit = order.Products;

    const totalAmount = async () => {
        let total = 0;
        if (!itemsEdit) return;
        itemsEdit.forEach((item) => {
            total += (item.OrderProduct.quantity * item.OrderProduct.price);
        })
        amount = total;

        return amount;
    }


    const getOrder = async (editId) => {
        await api.get(`/order/orders/${osId}`)
            .then((response) => setOrder(response.data));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItem = {
            "idProduct": idProduct,
            "idOrder": osId,
            "quantity": quantity,
            "price": price,
            "servicing": servicing,
            "notes": notes
        }
        for (let i = 0; i < order.Products.length; i++) {
            if (order.Products[i].id === indexId) {
                order.Products[i].OrderProduct = orderItem;
            }
        }
        let lista = [];

        for (let i = 0; i < order.Products.length; i++) {
            lista.push(order.Products[i].OrderProduct);
            lista.map((item) => delete item.createdAt);
            lista.map((item) => delete item.updatedAt);
        }
        delete order.Products;
        order.items = lista;
        await api.patch(`/order/orders/${osId}`, order);
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
                            name='servicing'
                            placeholder='Descrição do serviço'
                            value={servicing || ""}
                            onChange={(e) => setServicing(e.target.value)}
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
