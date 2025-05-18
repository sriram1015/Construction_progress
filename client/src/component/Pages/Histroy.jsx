import React, { useState, useEffect } from 'react';
import './History.css';

const node_url = import.meta.env.VITE_NODE_URL;
const flask_url = import.meta.env.VITE_FLASK_URL;

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('predictionHistory')) || [];
    setHistory(savedHistory);
  }, []);

  // // change that to fetch from backend
  // const fetchHistory = async () => {
  //   try {
  //     const response = await fetch(`${Backend_url}/history`); // Replace with your backend endpoint
  //     const data = await response.json();
  //     setHistory(data);
  //   } catch (error) {
  //     console.error('Error fetching history:', error);
  //   }
  // };
  
  return (
    <div className="history-page">
      <h1>Prediction History</h1>
      <ul>
        {history.length === 0 ? (
          <p>No predictions made yet.</p>
        ) : (
          history.map((record) => (
            <li key={record.id} className="history-item">
              <div className="history-details">
                <span>{record.text}</span>
                <span className="history-timestamp">{record.timestamp}</span>
              </div>
              <img src={record.image} alt="Prediction" className="history-image" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default HistoryPage;
