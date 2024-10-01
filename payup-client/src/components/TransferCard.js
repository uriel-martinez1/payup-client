import React from "react";

const TransferCard = ({ transfer }) => {

    // this is where we can put styling
    const containerStyle = {
        width: '80%',
        maxWidth: '1100px',
        margin: '0 auto',
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    };

    const flexStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '.5rem',
    };

    const itemStyle = {
        background: 'white',
        margin: '0.5em',
        padding: '0.5rem',
        borderRadius: '4px',
    };

    return (
        <div style={containerStyle}>
            <div style={flexStyle}>
                <p style={itemStyle}>Transfer ID: {transfer.transferId}</p>
                <p style={itemStyle}>Transfer type: {transfer.transferType}</p>
                <p style={itemStyle}>Transfer Status: {transfer.transferStatus}</p>
                <p style={itemStyle}>From: {transfer.userFrom.firstName} {transfer.userFrom.lastName}</p>
                <p style={itemStyle}>To: {transfer.userTo.firstName} {transfer.userTo.lastName}</p>
                <p style={itemStyle}>Amount: ${transfer.amount}</p>
            </div>
        </div>
    );
};

export default TransferCard;