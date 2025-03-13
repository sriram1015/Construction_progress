import React, { useState, useEffect } from 'react';
import './History.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('predictionHistory')) || [];
    setHistory(savedHistory);
  }, []);

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
