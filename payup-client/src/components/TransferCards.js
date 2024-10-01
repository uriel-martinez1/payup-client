import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import TransferCard from "./TransferCard";

const TransferCards = ({ transfers }) => {
    const { authState } = useContext(AuthContext);
    const transferCardsContainer = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    };

    return (
        <div style={transferCardsContainer}>
            {transfers.map((transfer) => (
                <Link
                    key={transfer.transferId}
                    to={`/home/${authState.user.userId}/transfer/${transfer.transferId}`}
                    state={{transfer}} // we pass the entire transfer object in the state
                    style={{ textDecoration: 'none' }}
                >
                    <TransferCard transfer={transfer} />
                </Link>
            ))}
        </div>
    );
};

export default TransferCards;