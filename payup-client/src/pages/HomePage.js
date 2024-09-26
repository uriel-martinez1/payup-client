import React from "react";
// this is where we will eventually load in the different components
import UserBalance from "../components/UserBalance";

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the main page!</h1>
            <UserBalance />
        </div>
    );
};

export default HomePage;