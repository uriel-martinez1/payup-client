import React, { useContext, useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import AuthContext from "../store/AuthContext";
import TransferCards from "../components/TransferCards";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const transfersApiEndpoint = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/transfers';

const HomePage = () => {
    const { authState } = useContext(AuthContext);
    const [transfers, setTransfers] = useState([]); // what to create an array that will holds of the transfer objects from the response
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate hook for navigating to the transferForm

    useEffect(() => {
        //function to fetch transfer objects
        const fetchTransfers = async () => {
            try {
                const response = await axios.get(transfersApiEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                setTransfers(Array.isArray(response.data) ? response.data : []); // once we get a response, place responses in the array transfer
            } catch (err) {
                setError('Error fetching the transfers.');
            }
        };

        fetchTransfers(); // this initiates the call to get transfers

    }, [authState.token]); // we need this to ensure the useEffect hook only runs if the token changes in authContext

    // we can also set styling as a const in our components
    const headerStyle = {
        textAlign: 'center',
        marginTop: '2rem',
        color: 'green'
    };

    const subHeaderStyle = {
        textAlign: 'center',
        marginTop: '2rem'
    };

    return (
        <div>
            <h1 style={headerStyle}>Welcome, {authState.user.username}!</h1> {/** Eventually we will need to adjust the return object to include user info like first, last name*/}
            <UserBalance />

            <h2 style={subHeaderStyle}>Transfers:</h2>
            {/**This is print error on screen */}
            {error && <p>{error}</p>}
            {transfers.length > 0 ? (
                <div>

                    <TransferCards transfers={transfers} />

                </div>
            ) : (
                <p>Loading transfers ...</p>
            )}
            <SubmitButton onClick={() => navigate(`/home/${authState.user.userId}/transfer`)} />
        </div>
    );
};

export default HomePage;