import './Order.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditItem } from './EditItem';
import { FormAddItem } from './FormAddItem';
import { OrderItem } from './OrderItem';

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
    const [render, setRender] = useState(0);
    const [disable, setDisable] = useState(true);
    let amount;

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8000/orders/${id}`)
                .then((response) => setOrder(response.data));
        }
        getData();
    }, [editQuantity]);


    const totalAmount = () => {
        let total = 0;
        if (!itemsEdit) return;
        itemsEdit.forEach((item) => {
            total += (item.quantity * item.price);
        })
        amount = total;

        return amount;
    }

    const updateOrder = async (e, id) => {
        totalAmount();
        const newOrder = {
            client: order.client,
            amount: amount,
            data_entrega: order.data_entrega,
            status: editStatus,
            payed: payed,
            items: itemsEdit
        }


        await axios.put(`http://localhost:8000/orders/${osId}`, newOrder);
        await axios.get(`http://localhost:8000/orders/${osId}`)
        .then((response) => setOrder(response.data));

    }

    const OnClickEdit = (e) => { }
    const OnVisible = (e) => { setVisible(true) }

    const data = new Date();
    let dataAtual = [];
    dataAtual = (data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
    const OnClickChangeDataEntrega = () => {
        editDataEntrega === "Pendente" ? setEditDataEntrega(dataAtual) : setEditDataEntrega("Pendente");

    }

    const OnClickChangeStatus = () => {
        editStatus === "Pronto" ? setEditStatus("Pendente") : setEditStatus("Pronto");
    }

    const OnClickIndex = (index) => {
        setIndex(index);
    }

    const OnPay = () => {
        setPayed(!payed);
    }

    let itemsEdit = order.items;

    const save = () => {
        itemsEdit[index].quantity = editQuantity;
        setItems(itemsEdit);
        order.data_entrega = editDataEntrega;
        order.status = editStatus;
        order.payed = payed;
        updateOrder(id);
    }

    const saveOs = () => {
        save();
        navigate(`/`)
    }

    const OnSaveEdit = (pay) => {
        if (pay === "payed") {
            setPayed(true);
        }
        save();
    }

    const OnleDelete = async (osId) => {
        await axios.delete(`http://localhost:8000/orders/${osId}`);
        navigate('/');
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

        axios.put(`http://localhost:8000/orders/${osId}`, newOrder);

    }

    const OnDeleteItem = (indexId) => {
        itemsEdit.splice(itemsEdit.indexOf(indexId), 1);
        updateOrder(osId);
    }

    const OnFormVisibility = () => { }

    return (
        order && !order.payed && <div>
            <div className='order-container'>
                <div className='order-header'>
                    <p>OS: {id}</p>
                    <p>Cliente: {order.client}</p>
                    <p>Valor: R$ {parseFloat((totalAmount())).toFixed(2)} </p>
                    {formAddVisible && <FormAddItem id={osId} OnSaveEdit={OnSaveEdit} save={save} />}
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
                                        onClick={() => OnSaveEdit("save")}
                                        className='item-Edit'
                                        disabled={disable}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editDataEntrega}
                                        onChange={(e) => setEditDataEntrega(e.target.value)}
                                        onClick={() => OnClickChangeDataEntrega()}
                                        disabled={disable}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        onClick={() => OnClickChangeStatus()}
                                        disabled={disable}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>}
                    {visible && <div>
                        <div className='finish-os-container'>
                            <div className='button-save-container'>
                                <button onClick={saveOs}>Salvar</button>
                            </div>
                            <div className='checkbox-pay-container'>
                                <input type="checkBox" name="payed" id="payed" onClick={() => OnPay(OnSaveEdit("payed"))} />
                                <span><label htmlFor="Pago">Pago</label> </span>
                                <div>
                                    <button onClick={() => OnFormVisibility(setVisible(false), setFormAddVisible(true))}>Adicionar item</button>
                                </div>
                            </div>

                        </div>
                    </div>}


                </div>
                <table>
                    <thead>
                        {<tr>
                            <th>Qtde</th>
                            <th>Descrição</th>
                            <th>Un</th>
                            <th>Total</th>
                            <th>Serviço</th>
                            <th>Observações</th>
                            <th>Entrega</th>
                            {visible && <th>--+--</th>}
                        </tr>}
                    </thead>
                    <tbody>
                        {order.items && order.items.map((item, key) => (
                            <tr key={key} onClick={() =>
                                OnVisible(setVisible(true),
                                    setDisable(false),
                                    setIndex(item.id),
                                    setEditQuantity(item.quantity),
                                    setEditDataEntrega(order.data_entrega),
                                    setEditStatus(order.status)
                                )} className='tr-hover'>
                                <td className='item-Edit td-width-60'
                                    onClick={
                                        (e) => OnClickEdit
                                            (
                                                setEditQuantity(item.quantity),
                                                setEditDataEntrega(order.data_entrega),
                                                setEditStatus(order.status),
                                                OnClickIndex(item.id)
                                            )

                                    }

                                >
                                    {item.quantity}
                                </td>
                                <td>{item.description}</td>
                                <td>R$ {parseFloat(item.price).toFixed(2)}</td>
                                <td>R$ {(item.quantity * item.price).toFixed(2)}</td>
                                <td>{item.service}</td>
                                <td>{item.notes}</td>
                                <td>{order.data_entrega}</td>
                                {visible && <td className='td-width-60 btn-delete' onClick={() => OnDeleteItem(item.id)}>Excluir</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
