import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
    
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

