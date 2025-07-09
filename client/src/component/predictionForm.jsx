
// --- PredictionForm.jsx ---
import React from 'react';
import './Styles/predictionform.css';

const PredictionForm = ({ file, preview, onFileChange, onPredict, isLoading, prediction, similarity }) => {
  return (
    <div className="prediction-form">
      <h2>Prediction Form</h2>
      <input type="file" id="fileInput" onChange={onFileChange} accept="image/*" hidden />
      <label htmlFor="fileInput" className="upload-btn">{file ? 'Change Image' : 'Upload Image'}</label>

      {preview && <img src={preview} alt="Preview" className="preview-img" />}

      <button onClick={onPredict} disabled={isLoading || !file} className="predict-btn">
        {isLoading ? 'Predicting...' : 'Predict'}
      </button>

      {prediction && similarity !== null && (
        <div className="result-box">
          <p><strong>Stage:</strong> {prediction}</p>
          <p><strong>Progress:</strong> {similarity}%</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
