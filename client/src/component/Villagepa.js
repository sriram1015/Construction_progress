import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberType = () => {
  const navigate = useNavigate();

  const handleMemberTypeSelection = () => {
    navigate('/hist');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
   
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#f9f9f9',
    marginBottom: '30px',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select Construction Type</h2>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        Housing and Urban Development
      </button>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        Labour and Employment
      </button>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        Public Work
      </button>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => handleMemberTypeSelection()}
      >
        School Construction
      </button>
    </div>
  );
};

export default MemberType;
