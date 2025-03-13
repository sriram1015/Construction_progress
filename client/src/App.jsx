import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to='/' className="nav-link">Home</Link></li>
          <li><Link to='/about' className="nav-link">About</Link></li>
          <li><Link to='/contact' className="nav-link">Contact Us</Link></li>
        </ul>
      </nav>

      <div className="content">
        <h1>Select Construction Type</h1>
        <li><Link to='/login' className="nav-link">Housing and Urban Development</Link></li>
        <li><Link to='/login' className="nav-link">Large Scale Industries</Link></li>
        <li><Link to='/login' className="nav-link">Hospitals</Link></li>
        <li><Link to='/login' className="nav-link">Higher Education Constructions</Link></li>
        <li><Link to='/login' className="nav-link">Highway Works</Link></li>
      </div>
    </div>
  );
};

export default App;

