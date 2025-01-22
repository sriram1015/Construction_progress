import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberType = () => {
  const navigate = useNavigate();

  const handleMemberTypeSelection = () => {
    // Redirect to the Login page with member type in state
    navigate('/villpa');
  };

  // Inline CSS for the container, heading, and buttons
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const headingStyle = {
    fontSize: '28px',
    color: '#fff',
    marginBottom: '40px',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '15px 40px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select Member</h2>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        Junior Engineer 1
      </button>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        Junior Engineer 2
      </button>
    </div>
  );
};

export default MemberType;
