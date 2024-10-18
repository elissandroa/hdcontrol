import React, { useEffect, useState } from 'react'
import './FormAddClient.css'
import axios from 'axios';

export const FormAddOs = ({ onClose }) => {

    const [usersData, setUsersData] = useState([]);
    const [userId, setUserId] = useState(null);

    let dataEntrega = "pending";
    let amount = 0;
    let status = "pendente";
    let payed = false;

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then((response) => setUsersData(response.data));
    }, [])


    const users = usersData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            amount,
            dataEntrega,
            status,
            payed,
            UserId: userId,
        }
        await axios.post("http://localhost:5000/api/order/orders", order)
            .then((response) => setUsersData(response.data));
        onClose();
    }




    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <select name="Client" id="client" onChange={(e) => setUserId(e.target.value)}>
                            <option defaultValue="Selecione um Cliente" className="option-client">Selecione um Cliente</option>
                            {
                                users && users.map((client, key) => (
                                    <option key={key} value={client.id}>{client.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='buttons-container'>
                        <button type='submit' className='btnAdd'>Adicionar</button>
                        <button onClick={onClose} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
