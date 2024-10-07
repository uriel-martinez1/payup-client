import React from "react";
import { useLocation } from "react-router-dom";

const TransferDetaiPage = () => {
    const location = useLocation();
    const { transfer } = location.state || {}; // This should allow us to access the transfer object from the location state
    
    if (!transfer) {
        return <p>No transfer details available.</p>;
    }
    return (
        <div>
            <h1>Transaction details</h1>
            <h2>${transfer.amount}</h2>
            <p>Transaction ID: {transfer.transferId}</p>
            <p>Payor: {transfer.userFrom.firstName} {transfer.userFrom.lastName}</p>
            <p>Recipient: {transfer.userTo.firstName} {transfer.userTo.lastName}</p>
            <p>Status: {transfer.transferStatus}</p>
        </div>
    );
};

export default TransferDetaiPage;