import React, { useEffect, useState } from 'react'
import './FormEditClient.css'
import api from '../utils/api';

export const FormChangeUserPassword = ({ onCloseFormUser, updateId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [client, setClient] = useState({});
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorNewPass, setErrorNewPass] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        try {
            setUserId(localStorage.getItem('userId'));
            api.get(`/users/2`)
                .then((response) => setClient(response.data));
        } catch (error) {
            console.log(error)
        }
    }, [])

    const user = client;
    const id = userId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(user)
        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            RoleId: user.RoleId
        }

        console.log(userData);

        userData.id = id;
        userData.password = password;


        console.log(userData);

        const passwordStatus = await api.post('/users/password', userData);
        console.log('passordStatus:', passwordStatus.data.message);

        if (passwordStatus.data.message) {
            setErrorPass("");
            userData.password = newPassword;
        } else {
            setErrorPass("A senha atual não é válida!");
            return;
        }

        if (newPassword === confirmNewPassword) {
            setErrorNewPass("");
            delete userData.id
            api.patch(`/users/${id}`, userData);
            onCloseFormUser();
        } else {
            setErrorNewPass("Senhas não são iguais!")
        }




    }


    return (
        <div className="fade">
            <div className="modal">
                <form onSubmit={handleSubmit} className='form-container'>
                    <div>
                        <input
                            type="password"
                            name='password'
                            placeholder='Digite a senha atual'
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p>{`${errorPass}`}</p>
                    <div>
                        <input
                            type="password"
                            name='newPassword'
                            placeholder='Digite a nova senha'
                            value={newPassword || ""}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name='confirmNewPassword'
                            placeholder='Confirme a nova senha'
                            value={confirmNewPassword || ""}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p>{`${errorNewPass}`}</p>
                    <div className='buttons-container'>
                        <button type='submit' className='btnAdd'>Atualizar</button>
                        <button onClick={onCloseFormUser} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
