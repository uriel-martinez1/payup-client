import React from "react";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    return (
        <BrowserRouter>
            <div>
                <h1>Register</h1>
                <RegisterForm />
            </div>
        </BrowserRouter>
    );
};

export default RegisterPage;