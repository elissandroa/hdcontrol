import React, { useEffect, useState } from 'react'
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { IoPersonAddOutline } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FormAddProduct } from './FormAddProduct';
import { FormDeleteProductConfirm } from './FormDeleteProductConfirm';
import { FormEditProduct } from './FormEditProduct';
import api from '../utils/api';


export const FormProducts = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [delReg, setDelReg] = useState(false);
    const [delId, setDelId] = useState(null);
    const [updateReg, setUpdateReg] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            await api.get("/prod/products")
                .then((response) => setProducts(response.data))
                .catch((err) => console.log(err));
        }
        getProducts();
    }, [open, updateStatus]);

    const onClose = () => {
        setOpen(!open);
    }

    const onCloseUpdateForm = () => {
        setUpdateReg(!updateReg);
    }

    const onModalDelete = (id) => {
        setDelReg(!delReg);
    }

    const onDelete = (id) => {
        try {
            api.delete(`/prod/products/${id}`);
        } catch (error) {
            console.log("Falha ao excluir:", error);
        } finally {
            onCloseDeleteModal();
        }
        api.get("/prod/products")
            .then((response) => setProducts(response.data));
        if (!products.filter((prod) => prod.id === id)) {
            const newProducts = products.filter((product) => product.id !== id);
            setProducts(newProducts);
        }


    }

    const productList = products;

    const getProducts = async () => {
        try {
            api.get("/prod/products")
                .then((response) => setProducts(response.data))
        } catch (error) {
            console.log(error);
        }
    }


    const onCloseDeleteModal = () => {
        setDelReg(!delReg);
    }

    const onModalEdit = () => {
        setUpdateReg(!updateReg);
    }

    const onSearch = async () => {
        if (search) {
            try {
                await api.get(`/prod/products/q?brand=${search}`)
                    .then((response) => setProducts(response.data))
            } catch (error) {
                console.log(error);
            } finally {
                setSearch("");
            }
        }

        if (!search) {
            getProducts();
        }
    }

    return (
     <div className='formproduct-container'>
            {open && <FormAddProduct onClose={onClose} />}
            {delReg && <FormDeleteProductConfirm onModalDelete={onModalDelete} onDelete={onDelete} delId={delId} />}
            {updateReg && <FormEditProduct onCloseUpdateForm={onCloseUpdateForm} updateId={updateId} updateStatus={updateStatus} setUpdateStatus={setUpdateStatus} />}
            <div className='header-container'>
                <div className="button-new">
                    <button onClick={() => setOpen(!open)}><FaPlusCircle /></button>
                </div>
                <div className='search'>
                    <input
                        type="text"
                        name='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    /> <span className='search-icon' onClick={onSearch}><MdSearch /></span>
                </div>
            </div>
            { productList !== 'Não há produtos cadastrados!' &&
                <table className="crudProductContainer">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Marca</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList && productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.description}</td>
                                <td>{product.brand}</td>
                                <td className='crudIconEdit' onClick={() => onModalEdit(setUpdateId(product.id))}><FaRegEdit /></td>
                                <td className='crudIconDelete' onClick={() => onModalDelete(setDelId(product.id))}><RiDeleteBin5Line /></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            }

        </div >
    )
}
