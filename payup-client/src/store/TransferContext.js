import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

export const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const [transfers, setTransfers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/transfers', {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                setTransfers(response.data || []);
            } catch (err) {
                setError('Error fetching transfers');
            }
        };

        // we need to call for the transfers
        fetchTransfers();
    }, [authState.token]);

    return (
        <TransferContext.Provider value={{transfers, error}}>
            {children}
        </TransferContext.Provider>
    )
}