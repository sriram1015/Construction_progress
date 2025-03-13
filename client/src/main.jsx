import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Auth/Login';
import Register from './component/SignUp';
import Dashboard from './component/Pages/Dashboard';
import Found from './component/Pages/Foundation';
import Plint from './component/Pages/Plinth';
import Floor from './component/Pages/Flooring';
import Linth from './component/Pages/Lintel';
import Roof from './component/Pages/Roofing';
import Paint from './component/Pages/painting';
import Plast from './component/Pages/Plast';
import History from './component/Pages/Histroy';
import Villpa from './component/Villagepa';
import Vill from './component/village';
import Admin from './component/Admin/Admin';
import Adminsignup from './component/Admin/Adminsignup';
import Admindashboard from './component/Admin/Admindashboard';
import Whether from './component/whether/Whether';
import Addrole from './component/Admin/addrole';
import App from './App';

const Main = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLogin = (data) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/found" element={<Found />} />
        <Route path="/plinth" element={<Plint />} />
        <Route path="/floor" element={<Floor />} />
        <Route path="/lintel" element={<Linth />} />
        <Route path="/roofing" element={<Roof />} />
        <Route path="/plast" element={<Plast />} />
        <Route path="/paint" element={<Paint />} />
        <Route path="/hist" element={<History />} />
        <Route path="/vill" element={<Vill />} />
        <Route path="/villpa" element={<Villpa />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminsignup" element={<Adminsignup />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/whether" element={<Whether />} />
        <Route path="/dashboard" element={<Dashboard userData={userData} />} />
        <Route path="/addrole" element={<Addrole />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
