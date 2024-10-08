import React, { useEffect, useState } from 'react'
import './FormEditClient.css'
import axios from 'axios';

export const FormEditClient = ({ onCloseUpdateForm, updateId, updateStatus, setUpdateStatus }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [client, setClient] = useState({});

    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/api/users/${updateId}`)
                .then((response) => setClient(response.data));
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone);
    }, [client])

    const getClients = async () => {
        try {
            getClients();
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const client = {
            name,
            email,
            phone
        }
        axios.patch(`http://localhost:5000/api/users/${updateId}`, client);
        getClients();
        setUpdateStatus(!updateStatus);
        onCloseUpdateForm();

    }






    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="text"
                            name='name'
                            placeholder='Nome do cliente'
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name='email'
                            placeholder='E-mail do cliente'
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='phone'
                            placeholder='Telefone do cliente'
                            value={phone || ""}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className='buttons-container'>
                        <button type='submit' className='btnAdd'>Atualizar</button>
                        <button onClick={onCloseUpdateForm} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
