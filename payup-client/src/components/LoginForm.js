import React, { useState, useContext } from "react";
import AuthContext from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const baseUrl = 'https://localhost:44315/login';

const LoginForm = () => {
    // this is for the form
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
    });

    const {login} = useContext(AuthContext); // Access the login function from AuthContext -- useContext is a hook that allows us to gain access to the login function inside the AuthContext.js

    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseUrl, formData)
            
            const { user, token } = response.data;

            //update the global auth state inside the store
            login(token, user);

            //once we are logged in we need to redirect to home page
            navigate(`/home/${user.userId}`);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username </label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>Password </label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;