import React from "react";
import { useLocation } from "react-router-dom";
//import axios from "axios";

const RequestUpdateStatusPage = () => {
    const location = useLocation();
    const { transfer } = location.state || {};
    // we will need to make a call to the backend for update the status of the transfer

    if (!transfer) {
        return <p>No transfer details available.</p>
    }

    return (
        <div>
            This is the request update status page for {transfer.transferId}
        </div>
    )
}
export default RequestUpdateStatusPage;