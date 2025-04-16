import React, { useContext } from "react";
import { HiHome } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { IoInformationCircleOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "./Auth/UseContext";
import "react-toastify/dist/ReactToastify.css";
import "./NavBar.css";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext); // Access user and setUser from context

    const handleLogout = () => {
        toast.success("Successfully logged out!", { position: "top-center" });
        setTimeout(() => {
            setUser(null); // Clear user context
        }, 2000);
    };

    const navItems = [
        { id: 1, name: "Home", path: "/", icon: <HiHome /> },
        user && { id: 2, name: "Dashboard", path: "/stage", icon: <RxDashboard /> },
        user && { id: 3 , name: "Profile", path: "/profile", icon: <CgProfile /> },
        { id: 3, name: "About", path: "/about", icon: <IoInformationCircleOutline /> },
        {
            id: 4,
            name: user ? "Logout" : "Login",
            path: user ? "#" : "/login",
            icon: user ? <IoLogOut /> : <IoLogIn />,
            action: user ? handleLogout : null,
        },
    ].filter(Boolean);

    return (
        <div className="navBar">
            <div className="logo">
                <Link to="/" className="nav-link">
                    <img src="/dcirs.png" alt="SRV Groups" className="logo-image" />
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