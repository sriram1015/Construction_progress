import React, { useContext } from "react";
import { UserContext } from "./UseContext";

const Profile = () => {
    const { user } = useContext(UserContext); // Access the user details

    if (!user) {
        return <p>No user logged in.</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Role: {user.memberType}</p>
        </div>
    );
};

export default Profile;