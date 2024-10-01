import { useState } from "react";

const SubmitButton = ({onClick}) => {
    const [isActive, setIsActive] = useState(false);

    // style for button
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
        <div style={placementStyle}>
            <button 
                style={buttonStyle}
                onMouseEnter={() => setIsActive(true)} // when hovers over button -- turn green
                onMouseLeave={() => setIsActive(false)} // set back to gray
                onClick={onClick}
            >
                {isActive} Pay or Request
            </button>
        </div>
    );
};

export default SubmitButton;