import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const baseUrl = 'https://localhost:44315/login';

const LoginForm = () => {
    // this is for the form
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
    });

    // for the returnUser information we receive upon successful authentication -- response data
    const [userData, setUserData] = useState({
        userId: null,
        username: '',
        token: ''
    });

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

            setUserData({
                userId: user.userId,
                username: user.username,
                token: token
            });

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
                <input type="text" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;