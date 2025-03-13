import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    secretKey: ''
  });
  
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5001/auth/adminregister', formData);
      setMessage(response.data.message);
      if(response.data.status==='ok'){
        Navigate('/admin');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`An error occurred. Please try again later.${error.message}`);
      }
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px' }}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Secret Key:</label>
          <input 
            type="text" 
            name="secretKey" 
            value={formData.secretKey} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Display the response message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegister;
