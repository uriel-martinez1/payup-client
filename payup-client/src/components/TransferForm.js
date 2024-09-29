import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const SendTransferURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/transfers';
const GetUsersURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/users';

const TransferForm = () => {
    const { authState } = useContext(AuthContext);
    const [transferData, setTransferData] = useState({
        userFrom: authState.user.userId,
        userTo: 0,
        amount: 0,
        transferType: ''
    });

    // we need a place to hold all the user objects
    const[userData, setUserData] = useState([]);
    // error handling
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // handle from changes
    const handleChange = (e) => {
        setTransferData({
            ...transferData,
            [e.target.name]: e.target.value
        });
    };

    // fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await axios.get(GetUsersURL, {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                setUserData(userResponse.data);
            } catch (error) {
                console.error('Error getting users:', error);
                setError('Error fetching users.')   
            }
        };
        fetchUsers();
    }, [authState.token]);

    // handle form submission
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
            console.error('Create transfer error:', error);
            setError('Error submitting form.')
        }
    };

    const handleCancel = () => {
        navigate(`/home/${authState.user.userId}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount </label>
                <input 
                    type="number" 
                    name="amount" 
                    required 
                    value={transferData.amount} 
                    onChange={handleChange} 
                />
            </div>
            
            {/**For now, lets create pay */}
            <div>
                <label>Transfer to: </label>
                <select 
                    name='userTo' 
                    id='userTo'
                    value={transferData.userTo}
                    onChange={handleChange}
                >
                    <option value="">Select a recipient </option>
                    {Array.isArray(userData) && userData.length > 0 ? (
                        userData.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))
                    ) : (
                        <option disabled>No users available</option>
                    )}
                </select>
            </div>
            
            {/**For now just pay button */}
            <button type="submit">Pay</button>
            <button type="submit" onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default TransferForm;