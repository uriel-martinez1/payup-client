import React, { useContext, useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import AuthContext from "../store/AuthContext";
import TransferCard from "../components/TransferCard";
import axios from "axios";

const transfersApiEndpoint = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/transfers';

const HomePage = () => {
    const { authState } = useContext(AuthContext);
    const [transfer, setTransfers] = useState([]); // what to create an array that will holds of the transfer objects from the response
    const [error, setError] = useState(null);

    useEffect(() => {
        //function to fetch transfer objects
        const fetchTransfers = async () => {
            try {
                const response = await axios.get(transfersApiEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                setTransfers(response.data); // once we get a response, place responses in the array transfer
            } catch (err) {
                setError('Error fetching the transfers.');
            }
        };

        fetchTransfers(); // this initiates the call to get transfers

    }, [authState.token]); // we need this to ensure the useEffect hook only runs if the token changes in authContext
    return (
        <div>
            <h1>Welcome to the main page, {authState.user.username}!</h1> {/** Eventually we will need to adjust the return object to include user info like first, last name*/}
            <UserBalance />

            <div>
                {/**This is print error on screen */}
                {error && <p>{error}</p>} 

                {transfer !== null ? (
                    <TransferCard transfer={{transfer}} />
                ) : (
                    <p>Loading transfers ...</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;