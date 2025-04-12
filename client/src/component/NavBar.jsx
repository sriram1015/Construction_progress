import React from "react";
import { HiHome } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { IoInformationCircleOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NavBar.css";

const NavBar = ({ isLoggedIn, onLogout }) => {
    const handleLogout = () => {
        toast.success("Successfully logged out!", { position: "top-center" });
        setTimeout(() => {
            onLogout();
        }, 2000); // Delay to allow the toast to display
    };

    const navItems = [
        { id: 1, name: "Home", path: "/", icon: <HiHome /> },
        isLoggedIn && { id: 2, name: "Dashboard", path: "/stage", icon: <RxDashboard /> },
        { id: 3, name: "About", path: "/about", icon: <IoInformationCircleOutline /> },
        {
            id: 4,
            name: isLoggedIn ? "Logout" : "Login",
            path: isLoggedIn ? "#" : "/login",
            icon: isLoggedIn ? <IoLogOut /> : <IoLogIn />,
            action: isLoggedIn ? handleLogout : null,
        },
    ].filter(Boolean); // Remove null values (e.g., Dashboard when not logged in)

    return (
        <div className="navBar">
            <div className="logo">
                <Link to="/" className="nav-link">
                    <img src='/dcirs.png' alt="SRV Groups" className="logo-image" />
                    SRV Groups
                </Link>
            </div>
            <div className="nav-list">
                {navItems.map((item) => (
                    <div key={item.id} className="nav-item">
                        {item.action ? (
                            <button onClick={item.action} className="nav-link">
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </button>
                        ) : (
                            <Link to={item.path} className="nav-link">
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default NavBar;