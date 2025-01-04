import React, { useState } from "react";
import axios from 'axios';
import './SignUp.css';  // Import the CSS file
import { useNavigate   } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
        memberType,
        secretKey: memberType === "districtuser" ? secretKey : undefined,
      });

      if (response.data.status === "ok") {
        alert("Registration Successful");
        navigator("/login");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      alert('Failed to register. Please try again later.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          <h3>RegisterAs:</h3>
          <div className="member-type-container">
            
            <div>
              <input
                type="radio"
                name="MemberType"
                value="localuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Local User
            </div>
            <div>
              <input
                type="radio"
                name="MemberType"
                value="villageuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Village User
            </div>
            <div>
              <input
                type="radio"
                name="MemberType"
                value="zoneuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              Zone User
            </div>
            <div>
              <input
                type="radio"
                name="MemberType"
                value="districtuser"
                onChange={(e) => setMemberType(e.target.value)}
              />
              District User
            </div>
          </div>
          {memberType === "districtuser" && (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
