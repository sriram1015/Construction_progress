import React, { useContext } from "react";
import { HiHome } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { IoInformationCircleOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../Auth/UseContext";
import "react-toastify/dist/ReactToastify.css";
import "./NavBar.css";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext); // Access user and setUser from context

    const handleLogout = () => {
        toast.success("Successfully logged out!", { position: "top-right" });
        setTimeout(() => {
            setUser(null); // Clear user context
        }, 1000);
    };

    const navItems = [
        user && { id: 1, name: "Dashboard", path: "/stages", icon: <RxDashboard /> },
        user && { id: 2, name: "Profile", path: "/profile", icon: <CgProfile /> },
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
        <div className="nav-Bar">
            <div className="nav-list">
                <div className="logo">
                    <Link to="/" className="nav-links">
                        <img src="/logo3.png" alt="onesrv" className="logo-image" />
                        <b>OneSRV</b>
                    </Link>
                </div>
                {navItems.map((item) => (
                    <div key={item.id} className="nav-item">
                        {item.action ? (
                            <button onClick={item.action} className="nav-links">
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </button>
                        ) : (
                            <Link to={item.path} className="nav-links">
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavBar;