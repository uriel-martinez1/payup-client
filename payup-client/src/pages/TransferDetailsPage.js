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
            <h1>Transfer details</h1>
            <p>This is the transfer detail page for transfer #{transfer.transferId}</p>
        </div>
    );
};

export default TransferDetaiPage;