import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const registerUrl = 'https://localhost:44315/register';

const RegisterForm = () => {
    // data section in vue?
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    const navigate = useNavigate(); // this is a hook that allows us to use the useNavigate

    // these are methods 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(registerUrl, formData);
            navigate('/'); //redirect us to login page after auccessful registration
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username </label>
                <input type="text" name="username" required value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>Password </label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} />
            </div>

            <div>
                <label>Email </label>
                <input type="email" name="username" required value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>First name </label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} />
            </div>

            <div>
                <label>Last name </label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;