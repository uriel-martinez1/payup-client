import React, { useState } from "react";
import axios from 'axios';

const RegisterForm = () => {
    // data section in vue?
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    // one way data binding in vue?
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44315/register', formData);
            console.log('User register:', response.data);
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

            <div>
                <label>Email</label>
                <input type="email" name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>First name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>

            <div>
                <label>Last name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;