import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
        memberType,
      });

      if (response.data.status === "ok") {
        alert("Login Successful");
        if (memberType === "villageuser") {
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
          <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Login As:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ flex: '1 1 50%', marginBottom: '8px' }}>
              <input
                type="radio"
                name="MemberType"
                value="localuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Junior Engineer
            </div>
            <div style={{ flex: '1 1 50%', marginBottom: '8px' }}>
              <input
                type="radio"
                name="MemberType"
                value="villageuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Assistant Engineer
            </div>
            <div style={{ flex: '1 1 50%', marginBottom: '8px' }}>
              <input
                type="radio"
                name="MemberType"
                value="zoneuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Executive Engineer
            </div>
            <div style={{ flex: '1 1 50%', marginBottom: '8px' }}>
              <input
                type="radio"
                name="MemberType"
                value="districtuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Chief Engineer
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ marginBottom: '8px', display: 'block', color: '#495057' }}>Email address</label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter email"
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <button type="submit" style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              color: '#fff',
              padding: '10px',
              fontSize: '18px',
              borderRadius: '4px',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer'
            }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
