import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignUp.css';

const node_url = import.meta.env.VITE_NODE_URL;
const flask_url = import.meta.env.VITE_FLASK_URL;

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${node_url}/auth/register`, {
        username,
        email,
        password,
        memberType,
        secretKey: memberType === "districtuser" ? secretKey : undefined,
      });

      if (response.data.status === "ok") {
        alert("Registration Successful");
        navigate("/login");
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
          <h1>Register</h1>
          <h3>Register As:</h3>
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
                placeholder="Enter secret key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
