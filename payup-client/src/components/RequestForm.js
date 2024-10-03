import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // we use this so we can router push back to the homepage when we get a success response back from the server
import AuthContext from "../store/AuthContext"; // so we can access the user data in the store

const SendRequestURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/transfers";
const GetUsersURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + "/api/users";

const RequestForm = () => {
    const {authState} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [transferData, setTransferData] = useState({
        userFrom: "",
        userTo: authState.user.userId,
        amount: 0.01,
        transferType: "Request"
    });

    // handle from changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTransferData({
            ...transferData,
            [name]: name === "amount" ? parseFloat(value): value
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

    return (
        <>
        </>
    )
};

export default RequestForm;