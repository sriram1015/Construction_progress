import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Auth/UseContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext); // Access the user details from context
    console.log("ProtectedRoute user:", user);
    if (!user) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If the user is logged in, render the children components
    return children;
};

export default ProtectedRoute;