import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const RoleId = localStorage.getItem('RoleId');

    useEffect(() => {

        const getCheckeduser = async () => {
            const token = localStorage.getItem('token');
            await api.get("/users/checkuser", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
            }).then((response) => {
                if (RoleId === 1) {
                    setAdmin(true);
                }
            });
        }
        getCheckeduser();

        const role = localStorage.getItem('RoleId');
        if(role == 1){
            setAdmin(true);
        }

        async function load() {
            const token = localStorage.getItem('token');
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                setAuthenticated(true);
                navigate("/");
            } else {
                setAuthenticated(false);
                navigate("/login");
            }

        }
        load();



    }, [])

    async function login(user) {

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data;
            })
            await authUser(data);
        } catch (error) {
            console.log(error);
        }

    }


    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('userId', JSON.stringify(data.user.id));
        localStorage.setItem('RoleId', JSON.stringify(data.user.RoleId));
        navigate("/");
    }

    async function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('RoleId');
        setAdmin(false);
        setAuthenticated(false);
        navigate("/login");
    }


    return { authenticated, login, admin, logout };

}



