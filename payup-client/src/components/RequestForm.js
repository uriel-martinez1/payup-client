import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // we use this so we can router push back to the homepage when we get a success response back from the server
import AuthContext from "../store/AuthContext"; // so we can access the user data in the store

const SendRequestURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/transfers";
const GetUsersURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/users";

const RequestForm = () => {
    const { authState } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState({
        userFrom: "",
        userTo: authState.user.userId,
        amount: 0.01,
        transferType: "Request"
    });

    // handle from changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData({
            ...requestData,
            [name]: name === "amount" ? parseFloat(value) : value
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
                console.error("Error getting users:", error);
                setError('Error fetching users.')
            }
        };
        fetchUsers();
    }, [authState.token]);


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // validate form values
            if (requestData.userFrom === "") {
                setError("Please select a user for the request.");
                return;
            }
            if (requestData.userFrom === requestData.userTo) {
                setError("Please select a valid user. You cannot request money from yourself.");
                return;
            }

            if (requestData.amount <= 0) {
                setError("The amount for the request must be greater than $0.");
                return;
            }

            // request and response
            const response = await axios.post(SendRequestURL, requestData, {
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

    // when user clicks cancel button
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
                    value={requestData.amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Requestee: </label>
                <select
                    name="userFrom"
                    id="userFrom"
                    required
                    value={requestData.userFrom}
                    onChange={handleChange}
                >
                    <option value="">Select a requestee: </option>
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

            <button type="submit">Request</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
};

export default RequestForm;