import React, {useContext} from "react";
import UserBalance from "../components/UserBalance";
import AuthContext from "../store/AuthContext";

const HomePage = () => {
    const {authState} = useContext(AuthContext);
    return (
        <div>
            <h1>Welcome to the main page, {authState.user.username}!</h1> {/** Eventually we will need to adjust the return object to include user info like first, last name*/}
            <UserBalance />
        </div>
    );
};

export default HomePage;