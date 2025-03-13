import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const apiUrl = 'http://localhost:5001';

export default function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("");
  const navigate = useNavigate();

  const handleAdmin = async (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize email to lowercase
    const normalizedEmail = username.toLowerCase();

    console.log("Email:", normalizedEmail);
    console.log("Password:", password);
    console.log("Member Type:", memberType);

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
        memberType, 
      });

      if (response.data.status === "ok") {
        alert("Login Successful");
        if (memberType === "assistantengineer") {
          navigate("/vill");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert('Failed to login. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        width: '400px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#343a40' }}>Login</h1>
          <h3 style={{ marginBottom: '16px', color: '#343a40' }}>
            Login As:
            <button
              onClick={handleAdmin}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0',
                fontWeight: 'bold'
              }}
            >
              Admin?
            </button>
          </h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Select MemberType</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{ flex: '1 1 100%', marginBottom: '8px' }}>
                <select
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="JuniorEngineer">JuniorEngineer</option>
                  <option value="assistantengineer">AssistantEngineer</option>
                  <option value="executiveengineer">ExecutiveEngineer</option>
                  <option value="chiefengineer">ChiefEngineer</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>User Name</label>
            <input
              type="username"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter name"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Password</label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                color: '#fff',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
