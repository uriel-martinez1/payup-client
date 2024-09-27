import React, {useState, useEffect} from "react";
import axios from "axios";

// we need the url for the axios call
const apiURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/balance';

const UserBalance = () => {
    const [balance, setBalance] = useState(null); // State to store balance
    const [error, setError] = useState(null); // State for error handling

    // useEffect runs when the component renders
    useEffect(() => {
        // function to make the axios call to server
        const fetchBalance = async () => {
            try {
                const response = await axios.get(apiURL);
                setBalance(response.data.balance);
            } catch (err) {
                setError('Error fetching balance.');
            }
        };

        fetchBalance(); 
    }, []);

    // return balance or loading/error messages
    return (
        <div>
            {error && <p>{error}</p>}
            {balance !== null ? (
                <p>Your balance is: ${balance}</p>
            ) : (
                <p>Loading balance ...</p>
            )}
        </div>
    );
};

export default UserBalance;