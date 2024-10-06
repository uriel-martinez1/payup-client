import React, { useContext, useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import AuthContext from "../store/AuthContext";
import TransferCards from "../components/TransferCards";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const transfersApiEndpoint = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/transfers';

const HomePage = () => {
    const { authState } = useContext(AuthContext);
    // const [transfers, setTransfers] = useState([]); // what to create an array that will holds of the transfer objects from the response
    const [requests, setRequests] = useState([]); // this will hold all transfer requests sent to the user
    const [otherTransfers, setOtherTransfers] = useState([]); // this will holds the rest of the transfers
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
                const transfersData = Array.isArray(response.data) ? response.data : []; // once we get a response, place responses in the array transfer
                console.log(response.data);

                const requestsData = transfersData.filter((transfer) => transfer.transferType === 'Request' && transfer.transferStatus === 'Pending' && transfer.userFrom.id === authState.user.userId); // filter the requests and add the request objects into a seperate array
                setRequests(requestsData); // add the filtered array to the requests array
                console.log(requestsData);

                const otherTransferData = transfersData.filter((transfer) => !(transfer.transferType === 'Request' && transfer.transferStatus === 'Pending' && transfer.userFrom.id === authState.user.userId));
                setOtherTransfers(otherTransferData);
                console.log(otherTransferData);

            } catch (err) {
                setError('Error fetching the transfers.');
            }
        };

        fetchTransfers(); // this initiates the call to get transfers

    }, [authState.token,authState.user.userId]); // we need this to ensure the useEffect hook only runs if the token changes in authContext

    // creating state for navigation tabs
    const [activeTab, setActiveTab] = useState('all');  // requests or all

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

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

    const containerStyle = {
        width: '80%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '32px 0px',
    };

    const navListStyle = {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
    };

    const navItemStyle = {
        marginRight: '1em'
    };

    const buttonLinkStyle = {
        background: 'none',
        border: 'none',
        color: 'green',
        textDecoration: 'underline',
        cursor: 'pointer',
    };

    return (
        <div>
            <h1 style={headerStyle}>Welcome, {authState.user.username}!</h1> {/** Eventually we will need to adjust the return object to include user info like first, last name*/}
            <UserBalance />

            {/**Navigation tabs*/}
            <div style={containerStyle}>
                <nav>
                    <ul style={navListStyle}>
                        <li style={navItemStyle}>
                            <button
                                style={buttonLinkStyle}
                                onClick={() => handleTabChange('all')}
                            >
                                Transactions
                            </button>
                        </li>
                        <li style={navItemStyle}>
                            <button
                                style={buttonLinkStyle}
                                onClick={() => handleTabChange('requests')}
                            >
                                Requests
                            </button>
                        </li>
                    </ul>
                </nav>
            </div >

            {/**TransferCards will render depending on activeTab selected */}

            {
                activeTab === 'all' && (
                    <div>
                        <h2 style={subHeaderStyle}>Transactions</h2>
                        {/**This is print error on screen */}
                        {error && <p>{error}</p>}
                        {otherTransfers.length > 0 ? (
                            <TransferCards transfers={otherTransfers} />
                        ) : (
                            <p>Loading transfers ...</p>
                        )}
                    </div>
                )
            }

            {
                activeTab === 'requests' && (
                    <div>
                        <h2 style={subHeaderStyle}>Requests</h2>
                        {/**This is print error on screen */}
                        {error && <p>{error}</p>}
                        {requests.length > 0 ? (
                            <TransferCards transfers={requests} />
                        ) : (
                            <p>No requests to approve or reject.</p>
                        )}
                    </div>
                )
            }

            <SubmitButton onClick={() => navigate(`/home/${authState.user.userId}/transfer`)} />
        </div >
    );
};

export default HomePage;