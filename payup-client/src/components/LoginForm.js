import React, { useState } from "react";
import axios from "axios";

const baseUrl = 'https://localhost:44315/register';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseUrl, formData);
            console.log('Submitted');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>Password</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange} />
            </div>
        </form>
    );
};

export default LoginForm;