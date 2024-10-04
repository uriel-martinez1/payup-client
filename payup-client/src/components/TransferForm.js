import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const SendTransferURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/transfers";
const GetUsersURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/users";

const TransferForm = () => {
    const { authState } = useContext(AuthContext);
    const [transferData, setTransferData] = useState({
        userFrom: authState.user.userId,
        userTo: "", // default to empty string to handle controller input
        amount: 0.01, // set a minimum value
        transferType: "Send"
    });

    // we need a place to hold all the user objects
    const [userData, setUserData] = useState([]);
    // error handling
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // handle from changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransferData({
            ...transferData,
            [name]: name === "amount" ? parseFloat(value) : value // parse amount as a number
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
            // Validate form values before sending transfer
            if (transferData.userTo === "" || transferData.userTo === transferData.userFrom) {
                setError("Please select a valid recipient different from the sender.");
                return;
            }

            const response = await axios.post(SendTransferURL, transferData, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                navigate(`/home/${authState.user.userId}`);
            }
        } catch (error) {
            console.error('Create transfer error:', error);
            setError('Error submitting form.');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(`/home/${authState.user.userId}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount: </label>
                <input
                    type="number"
                    name="amount"
                    step="0.01"
                    min="0.01"
                    required
                    value={transferData.amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Recipient: </label>
                <select
                    name='userTo'
                    id='userTo'
                    required
                    value={transferData.userTo}
                    onChange={handleChange}
                >
                    <option value="">Select a user: </option>
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

            <button type="submit">Pay</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}

export default TransferForm;