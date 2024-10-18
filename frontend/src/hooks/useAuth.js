import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        const getCheckeduser = async () => {
            const token = localStorage.getItem('token');
            await axios.get("http://localhost:5000/api/users/checkuser", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
            }).then((response) => {
                if (response.data.RoleId === 1) {
                    setAdmin(true);
                }
            });
        }
        getCheckeduser();

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
        navigate("/");
    }

    async function logout() {
        localStorage.removeItem('token');
        setAdmin(false);
        setAuthenticated(false);
        navigate("/login");
    }


    return { authenticated, login, admin, logout };

}



