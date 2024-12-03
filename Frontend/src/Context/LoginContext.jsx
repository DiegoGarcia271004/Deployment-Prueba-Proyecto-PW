import { createContext, useEffect, useState } from 'react';
import useUpdate from '../Hooks/UseUpdate';
import config from '../../config';

export const LoginContext = createContext({ 
    user: null, 
    token: null,
    role: null,
    handleLogin: () => {},
    updateUserField: () => {},
    handleSaveRole: () => {},
    handleSaveID: () => {},
    handleRemoveID: () => {},
    logout: () => {}   
});

export const LoginProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token', token);
        }

        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [user, token]);
    //deben usarse ambos en un componente proveedor que realice los post para el Login

    //metodo para guardar el usuario y token obtenidos por medio de solicitud http
    const handleLogin = (user, token) => {
        setUser(user);
        setToken(token);
    }

    //metodo que permite actualizar cada campo del usuario activo logeado
    const updateUserField = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value
        }));
    }

    const handleSaveRole = (role) => {
        setRole(role);
    }

    //metodo para almacenar el id del usuario obtenido por medio de solicitud http
    const handleSaveID = (id) => {
        sessionStorage.setItem('id', id);
    }

    //metodo para borrar el id del usuario logeado en componente de cierre de sesion
    const handleRemoveID = () => {
        sessionStorage.removeItem('id');
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
    }

    return (
        <>
            <LoginContext.Provider value={{ 
                user, 
                token, 
                role,
                handleLogin,
                updateUserField,
                handleSaveRole,
                handleSaveID,
                handleRemoveID,
                logout
            }}>
                {children}
            </LoginContext.Provider>
        </>
    );
}