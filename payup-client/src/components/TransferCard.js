import React from "react";

const TransferCard = ({ transfer }) => {
    return (
        <div>
            <p>Transfer ID: {transfer.transferId}</p>
            <p>Transfer type: {transfer.transferType}</p>
            <p>Transfer Status: {transfer.transferStatus}</p>
            <p>Amount: ${transfer.amount}</p>
        </div>
    )
}



export default TransferCard;