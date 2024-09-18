import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/SignUp';
import Dashboard from './Pages/Dashboard';
import Found from './Pages/Foundation';
import Plint from './Pages/Plinth';
import Floor from './Pages/Flooring';
import Linth from './Pages/Lintel';
import Roof from './Pages/Roofing';
import Paint from './Pages/painting';
import Plast from './Pages/Plast';
import Home from './component/Home';
import History from './Pages/Histroy';
import Villpa from './component/Villagepa';
import Vill from './component/village';

const App = () => {
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/found" element={<Found/>}/>
        <Route path="/plinth" element={<Plint/>}/>
        <Route path="/floor" element={<Floor/>}/>
        <Route path="/lintel" element={<Linth/>}/>
        <Route path="/roofing" element={<Roof/>}/>
        <Route path="/plast" element={<Plast/>}/>
        <Route path="/paint" element={<Paint/>}/>
        <Route path="/hist" element={<History/>}/>
        <Route path="/vill" element={<Vill/>}/>
        <Route path="/villpa" element={<Villpa/>}/>
        <Route path="/dashboard" element={<Dashboard userData={userData} />} />
      </Routes>
    </Router>
  );
};

export default App;
