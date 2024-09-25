import React, { useState } from 'react'
import './FormAddClient.css'
import axios from 'axios';

export const FormAddClient = ({onClose}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const client = {
            name,
            email,
            phone
        }
        axios.post("http://localhost:8000/clients", client);
        onClose();

    }
    
    


    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="text"
                            placeholder='Nome do cliente'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='E-mail do cliente'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="phone"
                            placeholder='Telefone do cliente'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
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
