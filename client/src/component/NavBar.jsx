import { HiHome } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { IoInformationCircleOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, onLogout }) => {
    const navItems = [
        { id: 1, name: "Home", path: "/", icon: <HiHome /> },
        isLoggedIn && { id: 2, name: "Dashboard", path: "/stage", icon: <RxDashboard /> },
        { id: 3, name: "About", path: "/about", icon: <IoInformationCircleOutline /> },
        {
            id: 4,
            name: isLoggedIn ? "Logout" : "Login",
            path: isLoggedIn ? "#" : "/login",
            icon: isLoggedIn ? <IoLogOut /> : <IoLogIn />,
            action: isLoggedIn ? onLogout : null
        }
    ].filter(Boolean); // Remove null values (e.g., Dashboard when not logged in)

    return (
        <div className="navBar">
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
    );
};

export default NavBar;