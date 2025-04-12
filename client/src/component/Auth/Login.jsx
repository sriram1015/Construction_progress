import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [memberType, setMemberType] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password && memberType) {
            const userData = { username, memberType };
            onLogin(userData); // Update sessionStorage and state in Main
            toast.success("Login Successful!", { position: "top-center"});
            setTimeout(() => {
                navigate(memberType === "assistantengineer" ? "/vill" : "/stage");
            }, 2000); // Delay navigation to allow toast to display
        } else {
            toast.error("Please fill in all fields", { position: "top-center", autoClose: 2000 });
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', width: '400px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#343a40' }}>Login</h1>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Select Member Type</label>
                        <select
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ced4da', borderRadius: '4px' }}
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="JuniorEngineer">Junior Engineer</option>
                            <option value="assistantengineer">Assistant Engineer</option>
                            <option value="executiveengineer">Executive Engineer</option>
                            <option value="chiefengineer">Chief Engineer</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ced4da', borderRadius: '4px' }}
                            placeholder="Enter username"
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ced4da', borderRadius: '4px' }}
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', fontSize: '18px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
}