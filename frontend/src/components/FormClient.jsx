import React, { useEffect, useState } from 'react'
import './FormClient.css';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoPersonAddOutline } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { FormAddClient } from './FormAddClient';
import { FormAddDeleteConfirm } from './FormAddDeleteConfirm';
import { FormEditClient } from './FormEditClient';

export const FormClient = ({ client }) => {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [delReg, setDelReg] = useState(false);
    const [delId, setDelId] = useState(null);
    const [updateReg, setUpdateReg] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [search, setSearch] = useState("");
 
    useEffect(() => {
        const getClients = async () => {
            await axios.get("http://localhost:5000/api/users")
                .then((response) => setClients(response.data))
                .catch((err) => console.log(err));
        }
        getClients();
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

    const onDelete = async (id) => {
        try {
            axios.delete(`http://localhost:5000/api/users/${id}`);
        } catch (error) {
            console.log("Falha ao excluir:", error);
        } finally {
            onCloseDeleteModal();
        }
        axios.get("http://localhost:5000/api/users")
        .then((response) => setClients(response.data));
   
        await getClients();
    }

    const getClients = async () => {
        try {
         await axios.get("http://localhost:5000/api/users")
            .then((response) => setClients(response.data))
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
        if(search) {
            try {
                 await axios.get(`http://localhost:5000/api/users/q?name=${search}`)
                .then((response) => setClients(response.data))
            } catch (error) {
                console.log(error);
            } finally {
                setSearch("");
            }
        }

        if(!search){
            getClients();
        }
    }


    return (
        <div className='formclient-container'>
            {open && <FormAddClient onClose={onClose} />}
            {delReg && <FormAddDeleteConfirm onModalDelete={onModalDelete} onDelete={onDelete} delId={delId}/>}
            {updateReg && <FormEditClient onCloseUpdateForm={onCloseUpdateForm} updateId={updateId} updateStatus={updateStatus} setUpdateStatus={setUpdateStatus} />}
            <div className='header-container'>
                <div className="button-new">
                    <button onClick={() => setOpen(!open)}><IoPersonAddOutline /></button>
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
            <table className="crudClientContainer">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients && clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td className='crudIconEdit' onClick={() => onModalEdit(setUpdateId(client.id))}><FaRegEdit /></td>
                                <td className='crudIconDelete' onClick={() => onModalDelete(setDelId(client.id))}><RiDeleteBin5Line /></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </div>
    )
}
