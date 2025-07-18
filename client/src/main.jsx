import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Auth/Login";
import Profile from "./Pages/Profile";
import PredictionDetails from "./Pages/PredictionDetails";
import App from "./App";
import NavBar from "./component/NavBar";
import ProtectedRoute from "./component/ProtectedRoute";
import Admin from "./Admin/Admindashboard";
import AddRole from "./Admin/addrole";
import { UserProvider } from "./Auth/UseContext";
import '@coreui/coreui/dist/css/coreui.min.css';
import DepartmentDetail from "./DepartmentDetail";
import Getjob from "./Pages/listdata";
import Register from "./component/SignUp";
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const location = useLocation();
    const hideNavBarRoutes = ["/admin"];

    return (
        <UserProvider>
            {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
            <ToastContainer position="top-right" />
            <Routes>
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<App />} />
                <Route path="/depart/:id" element={<DepartmentDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addrole" element={<AddRole />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/getjob"
                    element={
                        <ProtectedRoute>
                            <Getjob />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/stages"
                    element={
                        <ProtectedRoute>
                            <PredictionDetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </UserProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <Main />
        </Router>
    </React.StrictMode>
);