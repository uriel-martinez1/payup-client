import React from "react";
import TransferCard from "./TransferCard";

const TransferCards = ({transfers}) => {
    return (
        <div>
            {transfers.map((transfer) => {
                <TransferCard key={transfer.transferId} transfer={transfer} />
            })}
        </div>
    );
};

export default TransferCards;