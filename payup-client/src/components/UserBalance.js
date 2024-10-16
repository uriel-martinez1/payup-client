import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../store/AuthContext";
import axios from "axios";

// we need the url for the axios call
const apiURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/balance';

const UserBalance = () => {
    const {authState} = useContext(AuthContext);
    const [balance, setBalance] = useState(null); // State to store balance
    const [error, setError] = useState(null); // State for error handling

    // useEffect runs when the component renders
    useEffect(() => {
        // function to make the axios call to server
        const fetchBalance = async () => {
            try {
                const response = await axios.get(apiURL, {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                setBalance(response.data.balance);
            } catch (err) {
                setError('Error fetching balance.');
            }
        };

        fetchBalance();
    }, [authState.token]);

    //styling
    const containerStyle = {
        width: '80%',
        maxWidth: '1100px',
        margin: '0 auto',
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    };

    const flexStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.5rem',
    };

    const itemStyle = {
        background: 'white',
        margin: '0.5em',
        padding: '0.5rem',
        borderRadius: '4px',
    };

    // return balance or loading/error messages
    return (
        <div style={containerStyle}>
            <div style={flexStyle}>
                {error && <p>{error}</p>}
                {balance !== null ? (
                    <p style={itemStyle}>Your balance is: ${balance}</p>
                ) : (
                    <p style={itemStyle}>Loading balance ...</p>
                )}
            </div>
        </div>
    );
};

export default UserBalance;