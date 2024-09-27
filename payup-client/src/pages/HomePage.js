import React, {useContext} from "react";
import UserBalance from "../components/UserBalance";
import AuthContext from "../store/AuthContext";
import TransferCard from "../components/TransferCard";

const HomePage = () => {
    const {authState} = useContext(AuthContext);
    return (
        <div>
            <h1>Welcome to the main page, {authState.user.username}!</h1> {/** Eventually we will need to adjust the return object to include user info like first, last name*/}
            <UserBalance />
            <TransferCard transfer={{
                transferId: 1,
                transferType: "Send",
                tranferStatus: "Pending",
                amount: 0.01
            }} />
        </div>
    );
};

export default HomePage;