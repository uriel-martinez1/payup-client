import React from "react";
import axios from "axios";

// we need the url for the axios call
const apiURL = process.env.REACT_APP_PAYUP_SERVER_BASEURL + '/api/account/balance';

const UserBalance = (balance) => {
    return (
        <p>Balance: </p>
    );
};

export default UserBalance;