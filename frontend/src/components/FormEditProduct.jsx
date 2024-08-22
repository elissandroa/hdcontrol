import React, { useEffect, useState } from 'react'
import './FormEditProduct.css'
import axios from 'axios';

export const FormEditProduct = ({ onCloseUpdateForm, updateId, updateStatus, setUpdateStatus }) => {
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState({});

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/products/${updateId}`)
                .then((response) => setProduct(response.data));
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setDescription(product.description);
        setBrand(product.brand);
        setPrice(product.price);
    }, [product])

    const getProducts = async () => {
        try {
            getProducts();
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            description,
            brand,
            price
        }
        axios.put(`http://localhost:8000/products/${updateId}`, product);
        getProducts();
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
                            name='description'
                            placeholder='Descrição do produto'
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='brand'
                            placeholder='Marca do Produto'
                            value={brand || ""}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='price'
                            placeholder='Valor do produto'
                            value={price || ""}
                            onChange={(e) => setPrice(e.target.value)}
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
