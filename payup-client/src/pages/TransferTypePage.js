import { useState } from "react";

const CreateTransferPage = ({ onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const buttonStyle = {
        margin: '0 auto',
        backgroundColor: isActive ? 'darkgreen' : 'green',
        cursor: isActive ? 'pointer' : 'not-allowed',
        color: 'white',
        padding: '0.8rem 3.6rem',
        border: 'none'
    };

    const placementStyle = {
        textAlign: 'center',
        margin: '2rem 2rem 3rem'
    };

    return (
        <div>
            <h2>Pay or Request?</h2>
            <div style={placementStyle}>
                <button style={buttonStyle}>Pay</button>
            </div>
            <div style={placementStyle}>
                <button style={buttonStyle}>Requests</button>
            </div>
        </div>
    );
};
export default CreateTransferPage;