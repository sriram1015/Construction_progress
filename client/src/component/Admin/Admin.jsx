import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
const apiUrl = 'http://localhost:5001';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

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
      const response = await axios.post(`${apiUrl}/auth/adminlogin`, formData);
      setMessage(response.data.message);

      if (response.data.status === 'ok') {
        // Redirect to the dashboard upon successful login
        navigate('/admindashboard');
        console.log('Admin login successful');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ gap: '10px' }}>
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
        <button type="submit">Login</button>
      </form>

      {/* Display the response message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
