import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        // Redirect to login if the user is not logged in
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;