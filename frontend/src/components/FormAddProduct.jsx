import React, { useState } from 'react'
import './FormAddProduct.css'
import axios from 'axios';

export const FormAddProduct = ({ onClose }) => {
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            description,
            brand,
            price
        }
        axios.post("http://localhost:5000/api/prod/products", product);
        onClose();

    }




    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="text"
                            placeholder='Descrição do produto'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder='Marca do produto'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder='Valor do produto'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
