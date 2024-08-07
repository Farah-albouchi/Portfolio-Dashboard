import React, { createContext, useState } from 'react';
import { LoadApi } from '../api/LoadUserApi';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadMe = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            const data = await LoadApi(token);
            return data;
        } else {
            return null;
        }
    };
    const value = { user, setUser, loadMe };
    return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
