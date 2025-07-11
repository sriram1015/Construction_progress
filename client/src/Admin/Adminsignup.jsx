import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const node_url = import.meta.env.VITE_NODE_URL;

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    secretKey: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post(`${node_url}/auth/adminregister`, formData);
      setMessage(response.data.message);
      if (response.data.status === 'ok') {
        navigate('/admin');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`An error occurred. Please try again later.${error.message}`);
      }
    }
  };

  // CSS Styles
  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '400px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    input: {
      padding: '10px 40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      outline: 'none',
      gap: '10px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    message: {
      textAlign: 'center',
      marginTop: '10px',
      color: 'red' // Adjust color for error messages
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div> 
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Email:</label>&nbsp;&nbsp;&nbsp;&nbsp; 
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
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
            style={styles.input}
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
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>

      {/* Display the response message */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default AdminRegister;
