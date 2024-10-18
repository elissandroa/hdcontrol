import './Order.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { EditItem } from './EditItem';
import { FormAddItem } from './FormAddItem';
import { OrderItem } from './OrderItem';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { FormAddItemOs } from './FormAddItemOs';
import { FormEditItemOs } from './FormEditItemOs';
import { FormOsAdm } from './FormOsAdm';
import { Context } from '../context/UserContext';

export const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [editQuantity, setEditQuantity] = useState(0);
    const [editDataEntrega, setEditDataEntrega] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [osId, setOsId] = useState(id);
    const [visible, setVisible] = useState(false);
    const [payed, setPayed] = useState(false);
    const [formAddVisible, setFormAddVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [render, setRender] = useState(0);
    const [disable, setDisable] = useState(true);
    const [editItem, setEditItem] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(0);
    const [itemEditVisible, setItemEditVisible] = useState(false);
    const [itemForEdit, setItemForEdit] = useState({});
    const [indexId, setIndexId] = useState(null);
    const [osAdmForm, setOsAdmForm] = useState(false);
  
    const { admin } = useContext(Context);

    let amount;

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/order/orders/${id}`)
                .then((response) => setOrder(response.data))
                .catch((err) => console.log(err));

        }
        
        getData();

    }, [updateStatus, itemForEdit, id]);
        
    let itemsEdit = order.Products;
    let user = order.User;


    const totalAmount = async (itemsForCalc) => {
        let total = 0;
        if (!itemsForCalc) return;
        itemsForCalc.forEach((item) => {
            total += (itemsForCalc.quantity * itemsForCalc.price);
        })
        amount = total;

        return amount;
    }

    const updateOrder = async (e, id) => {
        await axios.patch(`http://localhost:5000/api/order/orders/${osId}`, newOrder);
        await axios.get(`http://localhost:5000/api/order/orders/${osId}`)
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


    const saveItem = async (id) => {
        const newOrder = {
            UserId: client,
            amount: amount,
            data_entrega: order.data_entrega,
            status: order.status,
            payed: order.payed,
            items: itemsEdit
        }

        await axios.patch(`http://localhost:5000/api/order/orders/${osId}`, newOrder);

    }


    const OnDeleteItem = async (indexId) => {
        const newOrderDelete = await axios.get(`http://localhost:5000/api/order/orders/${osId}`);
        const newOrder = newOrderDelete.data;
        delete newOrder.Products;
        delete newOrder.User;
        delete newOrder.updatedAt;
        delete newOrder.createdAt;
        delete newOrder.id;

        const itemsForEdit = [];
        for (let i = 0; i < itemsEdit.length; i++) {
            itemsForEdit.push(itemsEdit[i].OrderProduct);
            delete itemsForEdit[i].createdAt;
            delete itemsForEdit[i].updatedAt;
        }
        const itemsAfterDelete = itemsForEdit.filter((item) => item.idProduct != indexId);

        newOrder.items = itemsAfterDelete;

        await axios.patch(`http://localhost:5000/api/order/orders/${osId}`, newOrder);
        await axios.get(`http://localhost:5000/api/order/orders/${osId}`)
            .then((response) => setOrder(response.data));
    }

    const onClose = () => {
        setVisible(!visible);
    }


    const onCloseEditForm = () => {
        setItemEditVisible(!itemEditVisible);
    }

    const onCloseAdmForm = () => {
        setOsAdmForm(!osAdmForm);
    }

    const OnFormVisibility = () => { }

    const editOsItem = (item) => {
        setItemForEdit(item);
        setIndexId(item.id);
        setOsId(id);
        setItemEditVisible(!itemEditVisible);
    }


    return (
       user && order &&  <div>
            {visible && <FormAddItemOs onClose={onClose} setUpdateStatus={setUpdateStatus} updateStatus={updateStatus} osId={osId} />}
            {itemEditVisible && <FormEditItemOs onCloseEditForm={onCloseEditForm} setUpdateStatus={setUpdateStatus} updateStatus={updateStatus} itemForEdit={itemForEdit} osId={osId} indexId={indexId} />}
            {osAdmForm && <FormOsAdm onCloseAdmForm={onCloseAdmForm} setUpdateStatus={setUpdateStatus} updateStatus={updateStatus} itemForEdit={itemForEdit} osId={osId} indexId={indexId} />}
            <div className='order-container'>

                <div className='order-header'>
                    <div className="order-new">
                        {admin && <button onClick={() => setVisible(!visible)}><FaPlusCircle /></button>}
                    </div>
                    <div className='os-header-info'>
                        <p>OS: {order.id}</p>
                        <p>Cliente: {user.name}</p>
                        <p>Valor: R$ {parseFloat(order.amount).toFixed(2)} </p>
                    </div>
                    <div>
                        {admin ? <button onClick={() => setOsAdmForm(!osAdmForm)}>Entrega</button> : <button onClick={() => navigate('/')}>Voltar</button>}
                    </div>
                </div>
                <table>
                    <thead>
                        {<tr>
                            <th>ID</th>
                            <th>Qtde</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Total</th>
                            <th>Serviço</th>
                            <th>Observações</th>
                            {admin && <th>Editar</th>}
                            {admin && <th>Excluir</th>}
                        </tr>}
                    </thead>
                    <tbody>
                        {order.Products && order.Products.map((item, key) => (
                            <tr key={key} className='tr-hover'>
                                <td>{item.id}</td>
                                <td>{item.OrderProduct.quantity}</td>
                                <td>{item.description}</td>
                                <td>R$ {parseFloat(item.OrderProduct.price).toFixed(2)}</td>
                                <td>R$ {(item.OrderProduct.quantity * item.OrderProduct.price).toFixed(2)}</td>
                                <td>{item.OrderProduct.servicing}</td>
                                <td>{item.OrderProduct.notes}</td>
                                {admin && <td onClick={() => editOsItem(item)}><FaRegEdit /></td>}
                                {admin && <td className='td-width-60 btn-delete' onClick={() => OnDeleteItem(item.id)}><RiDeleteBin5Line /></td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
