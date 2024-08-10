import './Order.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditItem } from './EditItem';
import { FormAddItem } from './FormAddItem';

export const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [editQuantity, setEditQuantity] = useState(0);
    const [editDataEntrega, setEditDataEntrega] = useState("Pendente");
    const [editStatus, setEditStatus] = useState("Pendente");
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [osId, setOsId] = useState(id);
    const [visible, setVisible] = useState(null);
    const [payed, setPayed] = useState(false);
    const [formAddVisible, setFormAddVisible] = useState(false);
    const [products, setProducts] = useState([]);

    let amount;

    useEffect(() => {

        axios.get(`http://localhost:8000/orders/${id}`)
            .then((response) => setOrder(response.data));
    }, [])


    const totalAmount = () => {
        let total = 0;
        if (itemsEdit) {
            itemsEdit.forEach((item) => {
                total += (item[1] * item[3]);
            })
            amount = total;
        }
        return amount;
    }

    const updateOrder = (e, id) => {
        totalAmount();
        const newOrder = {
            client: order.client,
            amount: amount,
            data_entrega: order.data_entrega,
            status: editStatus,
            payed: payed,
            items: itemsEdit
        }
        setOrder(newOrder);
        if (order) {
            axios.put(`http://localhost:8000/orders/${osId}`, order);
        }
    }

    const handleClickEdit = (e) => { }
    const handleVisible = (e) => { setVisible(true) }

    const data = new Date();
    let dataAtual = [];
    dataAtual = (data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
    const handleClickChangeDataEntrega = () => {
        editDataEntrega === "Pendente" ? setEditDataEntrega(dataAtual) : setEditDataEntrega("Pendente");

    }

    const handleClickChangeStatus = () => {
        editStatus === "Pronto" ? setEditStatus("Pendente") : setEditStatus("Pronto");
    }

    const hancleClickIndex = (index) => {
        setIndex(index);
    }

    const handlePay = () => {
        setPayed(!payed);
    }

    let itemsEdit = order.items;

    const handleSaveEdit = (pay) => {
        if (pay === "payed") {
            setPayed(true);
        }
        itemsEdit[index][1] = editQuantity;
        setItems(itemsEdit);
        order.data_entrega = editDataEntrega;
        order.status = editStatus;
        order.payed = payed;
        updateOrder(id);
    }

    const saveItem = (id) => {
        const newOrder = {
            client: client,
            amount: amount,
            data_entrega: order.data_entrega,
            status: order.status,
            payed: order.payed,
            items: items
          }
          setOrder(newOrder);
          if (order) {
            axios.put(`http://localhost:8000/orders/${osId}`, order);
          }
    }
    
    const handleFormVisibility = () => { }

    return (
        order && !order.payed && <div>
            <div className='order-container'>
                <div className='order-header'>
                    <p>OS: {id}</p>
                    <p>Cliente: {order.client}</p>
                    <p>Valor: R$ {parseFloat((order.amount)).toFixed(2)} </p>
                    {formAddVisible && <FormAddItem id={osId}/>}
                    {visible && <table>
                        <thead>
                            <tr>
                                <th>Quantidade</th>
                                <th>Entrega</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="number"
                                        value={editQuantity}
                                        onChange={(e) => setEditQuantity(e.target.value)}
                                        onClick={handleSaveEdit}
                                        className='item-Edit'

                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editDataEntrega}
                                        onChange={(e) => setEditDataEntrega(e.target.value)}
                                        onClick={() => handleClickChangeDataEntrega()}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        onClick={() => handleClickChangeStatus()}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>}
                    {visible && <div>
                        <div className='finish-os-container'>
                            <div className='button-save-container'>
                                <button onClick={handleSaveEdit}>Salvar</button>
                            </div>
                            <div className='checkbox-pay-container'>
                                <input type="checkBox" name="payed" id="payed" onClick={() => handlePay(handleSaveEdit("payed"))} />
                                <span><label htmlFor="Pago">Pago</label> </span>
                                <div>
                                    <button onClick={() => handleFormVisibility(setVisible(false), setFormAddVisible(true))}>New</button>
                                </div>
                            </div>

                        </div>
                    </div>}


                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Qtde</th>
                            <th>Descrição</th>
                            <th>Un</th>
                            <th>Total</th>
                            <th>Entrega</th>
                            <th>--+--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.map((item, key) => (
                            <tr key={key} onClick={() => handleVisible(setVisible(true), setEditQuantity(item[1]), setEditDataEntrega(order.data_entrega))} className='tr-hover'>
                                <td className='item-Edit td-width-60'
                                    onClick={
                                        (e) => handleClickEdit
                                            (
                                                setEditQuantity(item[1]),
                                                setEditDataEntrega(order.data_entrega),
                                                setEditStatus(order.status),
                                                hancleClickIndex(item[0])
                                            )

                                    }

                                >
                                    {item[1]}
                                </td>
                                <td>{item[2]}</td>
                                <td>R$ {parseFloat(item[3]).toFixed(2)}</td>
                                <td>R$ {(item[1] * item[3]).toFixed(2)}</td>
                                <td>{order.data_entrega}</td>
                                <td className='td-width-60'>Excluir</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
