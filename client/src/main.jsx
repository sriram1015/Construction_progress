import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Auth/Login";
import Profile from "./component/Auth/Profile";
import Stage from "./component/Pages/Stages";
import App from "./App";
import NavBar from "./component/NavBar";
import ProtectedRoute from "./component/ProtectedRoute";
import Admin from "./component/Admin/Admindashboard";
import AddRole from "./component/Admin/addrole"
import { UserProvider } from "./component/Auth/UseContext";

const Main = () => {
    return (
        <UserProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/addrole" element={<AddRole />} />
                    <Route
                        path="/stage"
                        element={
                            <ProtectedRoute>
                                <Stage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);