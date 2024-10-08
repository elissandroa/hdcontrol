import React, { useEffect, useState } from 'react'
import './FormOsAdm.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FormOsAdm = ({ onCloseAdmForm, setUpdateStatus, updateStatus, itemForEdit, osId, indexId }) => {
    const [status, setStatus] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [payed, setPayed] = useState(false);
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getOrder = async () => {
            try {
                await axios.get(`http://localhost:8000/orders/${osId}`)
                    .then((response) => setOrder(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        getOrder();
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        const orderItem = {
            data_entrega: dataEntrega,
            status,
            payed
        }
        order.data_entrega = dataEntrega;
        order.status = status;
        order.payed = payed === "true" ? true : false;
        axios.patch(`http://localhost:8000/orders/${osId}`, order);
        setUpdateStatus(!updateStatus);
        onCloseAdmForm();
        if(payed === "true"){
            navigate("/");
        }
    }


    useEffect(() => {
        setStatus(order.status);
        setDataEntrega(order.data_entrega);
        setPayed(order.payed);
    }, [order])



    return (
     order && <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="text"
                            name='dataEntrega'
                            placeholder='Data de Entrega'
                            value={dataEntrega || ""}
                            onChange={(e) => setDataEntrega(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value="status" className="option-form-adm">Status: {status}</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Pronto">Pronto</option>
                        </select>
                    </div>
                    <div>
                        <select name="payed" id="payed" onChange={(e) => setPayed(e.target.value)}>
                            <option value="payed" className="option-form-adm">{!payed ? "Pagamento pendente" : "Pago"}</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className='buttons-container'>
                        <button className='btnAdd'>Atualizar</button>
                        <button onClick={onCloseAdmForm} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}