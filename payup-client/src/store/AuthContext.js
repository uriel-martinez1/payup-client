import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create the context -- store?
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || null,
    });

    // function for login the user
    const login = (token, user) => {
        setAuthState({ token, user });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // function for logout 
    const logout = (navigate) => {
        setAuthState({ token: '', user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;