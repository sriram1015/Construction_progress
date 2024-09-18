import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import PlinthBeam from './Plinth';
import Lintel from './Lintel';
import Roofing from './Roofing';
import Plastering from './Plast';
import Flooring from './Flooring';
import Painting from './painting';
import axios from 'axios';
import PredictForm from './Foundation';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    return localStorage.getItem('selectedComponent') || null;
  });

  const [predictions, setPredictions] = useState(() => {
    const savedPredictions = localStorage.getItem('predictions');
    return savedPredictions ? JSON.parse(savedPredictions) : {
      Foundation: null,
      PlinthBeam: null,
      Lintel: null,
      Roofing: null,
      Plastering: null,
      Flooring: null,
      Painting: null,
    };
  });

  const [totalProgression, setTotalProgression] = useState(0);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/predictions');
        const data = response.data;
        setPredictions(data);
        calculateTotalProgression(data);
        // Store predictions in localStorage
        localStorage.setItem('predictions', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, []);

  useEffect(() => {
    // Update local storage when predictions change
    localStorage.setItem('predictions', JSON.stringify(predictions));
    localStorage.setItem('selectedComponent', selectedComponent);
  }, [predictions, selectedComponent]);

  const handlePredictionUpdate = (stage, percent) => {
    setPredictions((prevPredictions) => {
      const updatedPredictions = { ...prevPredictions, [stage]: percent };
      calculateTotalProgression(updatedPredictions);
      return updatedPredictions;
    });
  };

  const calculateTotalProgression = (predictions) => {
    const total = Object.values(predictions).reduce((sum, value) => {
      return sum + (value !== null ? value : 0);
    }, 0);
    setTotalProgression(total / 7);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Foundation':
        return <PredictForm onPredictionUpdate={handlePredictionUpdate} />;
      case 'PlinthBeam':
        return <PlinthBeam onPredictionUpdate={handlePredictionUpdate} />;
      case 'Lintel':
        return <Lintel onPredictionUpdate={handlePredictionUpdate} />;
      case 'Roofing':
        return <Roofing onPredictionUpdate={handlePredictionUpdate} />;
      case 'Plastering':
        return <Plastering onPredictionUpdate={handlePredictionUpdate} />;
      case 'Flooring':
        return <Flooring onPredictionUpdate={handlePredictionUpdate} />;
      case 'Painting':
        return <Painting onPredictionUpdate={handlePredictionUpdate} />;
      default:
        return <div>Please select an option from the left.</div>;
    }
  };

  return (
    <div>
      <div className="navbar">
        <h1>DASHBOARD</h1>
      </div>
      <div className="container">
        {renderComponent()}
        <div className="side-nav">
          {/* Circular Progress Bar */}
          <div className="circular-progress">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring__background"
                stroke="#e6e6e6"
                strokeWidth="10"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring__circle"
                stroke="#4caf50"
                strokeWidth="10"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
                style={{
                  strokeDasharray: `${Math.PI * 2 * 52}`,
                  strokeDashoffset: `${Math.PI * 2 * 52 * (1 - totalProgression / 100)}`,
                }}
              />
            </svg>
            {/* Display Total Progression Percentage in the Center */}
            <div className="progress-text">
              <strong>{totalProgression.toFixed(2)}%</strong>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button className="nav-button" onClick={() => setSelectedComponent('Foundation')}>
            Foundation {predictions.Foundation !== null && `(${predictions.Foundation}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('PlinthBeam')}>
            PlinthBeam {predictions.PlinthBeam !== null && `(${predictions.PlinthBeam}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('Lintel')}>
            Lintel {predictions.Lintel !== null && `(${predictions.Lintel}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('Roofing')}>
            Roofing {predictions.Roofing !== null && `(${predictions.Roofing}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('Plastering')}>
            Plastering {predictions.Plastering !== null && `(${predictions.Plastering}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('Flooring')}>
            Flooring {predictions.Flooring !== null && `(${predictions.Flooring}%)`}
          </button>
          <button className="nav-button" onClick={() => setSelectedComponent('Painting')}>
            Painting {predictions.Painting !== null && `(${predictions.Painting}%)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
