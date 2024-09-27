import { useState } from "react";

const SubmitButton = () => {
    const [isActive, setIsActive] = useState(false);

    // style for button
    const buttonStyle = {
        margin: '0 auto',
        backgroundColor: isActive ? 'green' : 'gray',
        cursor: isActive ? 'pointer' : 'not-allowed',
        color: 'white',
        padding: '0.6rem 1.2rem',
        border: 'none'
    };

    const placementStyle = {
        textAlign: 'center',
        marginTop: '2rem'
    };

    return (
        <div style={placementStyle}>
            <button 
                style={buttonStyle}
                onMouseEnter={() => setIsActive(true)} // when hovers over button -- turn green
                onMouseLeave={() => setIsActive(false)} // set back to gray 
            >
                {isActive} Pay or Request
            </button>
        </div>
    );
};

export default SubmitButton;