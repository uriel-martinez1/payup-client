import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateTransferPage = ({ onClick }) => {
    const [isActive, setIsActive] = useState(false);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

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
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => setIsActive(false)}
                    onClick={() => navigate(`/home/${authState.user.userId}/transfer/pay`)}
                >
                    Pay</button>
            </div>
            <div style={placementStyle}>
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => setIsActive(false)}
                    onClick={() => navigate(`/home/${authState.user.userId}/transfer/request`)}
                >
                    Request</button>
            </div>
        </div>
    );
};
export default CreateTransferPage;