import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "./UseContext";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
    const { setUser } = useContext(UserContext); // Access the UserContext to update user details
    const [username, setUsername] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password
    const [memberType, setMemberType] = useState(""); // State for member type
    const navigate = useNavigate(); // React Router's navigation hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username && password && memberType) {
            try {
                const userData = { username, memberType }; // Mock user data
                setUser(userData); // Update context with user details
                toast.success("Login Successful!", { position: "top-center" });

                setTimeout(() => {
                    navigate("/profile"); // Redirect to profile page after login
                }, 2000);
            } catch (error) {
                toast.error("Invalid credentials. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        } else {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1 className="login-title">Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Member Type</label>
                        <select
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                            className="form-select"
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="JuniorEngineer">Junior Engineer</option>
                            <option value="assistantengineer">
                                Assistant Engineer
                            </option>
                        </select>
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
}