import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const SendTransferURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/transfers';

const TransferForm = () => {
    const { authState } = useContext(AuthContext);
    const [transferData, setTransferData] = useState({
        userFrom: 0,
        userTo: 0,
        amount: 0,
        transferType: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTransferData({
            ...transferData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SendTransferURL, transferData, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            if (response) {
                navigate(`/home/${authState.user.userId}`);
            }
        } catch (error) {
            console.error('Create transfer error:', error)
                ;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount </label>
                <input type="number" name="amount" required value={transferData.amount} onChange={handleChange} />
            </div>

        </form>
    )
}

export default TransferForm;