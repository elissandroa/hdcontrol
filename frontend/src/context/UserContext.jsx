import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {

    const { authenticated, login, admin, logout } =  useAuth();

    return (
        <Context.Provider value={{ authenticated, login, admin, logout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, UserProvider};