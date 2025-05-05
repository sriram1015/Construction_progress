import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { UserContext } from "./UseContext";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const node_url = import.meta.env.VITE_NODE_URL;

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [memberType, setMemberType] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !memberType) {
            toast.error("Please fill in all fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${node_url}/auth/login`, {
                username,
                password,
                memberType,
            });

            const data = response.data;

            if (data.status === "ok") {
                const userData = { username, memberType };
                setUser(userData);
                toast.success("Login Successful!", { position: "bottom-right" });

                // Navigate based on memberType (case-insensitive)
                const type = memberType.toLowerCase();
                navigate(type === "assistantengineer" ? "/vill" : "/stage");
            } else {
                toast.error(data.message || "Login failed. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                toast.error(
                    error.response.data.message || "Server error. Please try again later.",
                    { position: "top-right", autoClose: 2000 }
                );
            } else if (error.request) {
                toast.error("Network error. Please check your connection.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } finally {
            setLoading(false); // End loading
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
                            <option value="AssistantEngineer">Assistant Engineer</option>
                        </select>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
