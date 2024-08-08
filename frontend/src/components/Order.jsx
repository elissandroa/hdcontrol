<<<<<<< HEAD
import './Order.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditItem } from './EditItem';

export const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [editQuantity, setEditQuantity] = useState(0);
    const [editDataEntrega, setEditDataEntrega] = useState("");
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);


    useEffect(() => {

        axios.get(`http://localhost:8000/orders/${id}`)
            .then((response) => setOrder(response.data));

    }, [])



    const updateOrder = (e, id) => {
        e.preventDefault();
        const newOrder = {
            client: order.client,
            amount: order.amount,
            data_entrega: order.data_entrega,
            status: order.status,
            items: itemsEdit
        }
        setOrder(newOrder);
        if (order) {
            axios.put(`http://localhost:8000/orders/${id}`, order);
            navigate('/');
        }
    }

    const handleClickEdit = (e) => {
        setEditQuantity(e.target.value);
    }

    const data = new Date();
    let dataAtual = [];
    dataAtual = (data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
    const handleClickChangeStatus = () => {

        setEditDataEntrega(dataAtual);
    }

    const hancleClickIndex = (index) => {
        setIndex(index);
    }

    let itemsEdit = order.items;
    console.log(itemsEdit);

    const handleSaveEdit = () => {
       itemsEdit[index][1] = editQuantity;
       setItems(itemsEdit);
       updateOrder(id);
    }

    return (

        order && <div className='order-container'>
            <div className='order-header'>
                <p>OS: {order.id}</p>
                <p>Cliente: {order.client}</p>
                <p>Valor: R$ {parseFloat((order.amount)).toFixed(2)} </p>
                <table>
                    <thead>
                        <tr>
                            <th>Quantidade</th><th>Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                type="number"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                className='item-Edit'
                                onClick={handleSaveEdit}
                            />
                            </td>
                            <td><input
                                type="text"
                                value={editDataEntrega}
                                onChange={(e) => setEditDataEntrega(e.target.value)}
                                onClick={() => handleClickChangeStatus()}
                            />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Fornecedor</th>
                        <th>Un</th>
                        <th>Total</th>
                        <th>Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items && order.items.map((item, key) => (
                        <tr key={key}>
                            <td className='item-Edit'
                                onClick={
                                    (e) => handleClickEdit(setEditQuantity(item[1]),
                                        setEditDataEntrega(order.data_entrega),
                                        hancleClickIndex(item[0])
                                    )
                                      
                                }
                            >
                                {item[1]}
                            </td>
                            <td>{item[2]}</td>
                            <td>{order.client}</td>
                            <td>{item[3]}</td>
                            <td>R$ {(item[1] * item[3]).toFixed(2)}</td>
                            <td>{order.data_entrega}</td>
                            <td>{item[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
=======
import "./Order.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/orders/${id}`)
      .then((response) => setOrder(response.data));
  }, [id]);
    
  
  const updateOrder = () => {
    const OrderUpdate = {
      client: order.client,
      amount: order.amount,
      data_entrega: order.data_entrega,
      status: order.status,
      items: order.items,
    };
    setOrder(OrderUpdate);
    if (order) {
      axios.put(`http://localhost:8000/orders/${order.id}`, order);
    }
  }
   return (
    order && (
      <div className="order-container">
        <div className="order-header">
          <p>OS: {order.id}</p>
          <p>Cliente: {order.client}</p>
          <p>Valor: R$ {parseFloat(order.amount).toFixed(2)} </p>
          <button>Editar</button>
          <button>Excluir</button>
>>>>>>> dd049b075808b82d3c4d44f6a6f3fa771f4bda2b
        </div>
        <table>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Fornecedor</th>
              <th>Un</th>
              <th>Total</th>
              <th>Entrega</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order.items &&
              order.items.map((item, key) => (
                <tr key={key}>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{order.client}</td>
                  <td>{item[3]}</td>
                  <td>R$ {(item[1] * item[3]).toFixed(2)}</td>
                  <td>{order.data_entrega}</td>
                  <td>{item[0]}</td>
                  <td>Editar</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
};
