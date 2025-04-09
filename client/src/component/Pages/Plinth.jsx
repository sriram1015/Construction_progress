import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PredictForm.css';

const flask_url = import.meta.env.VITE_FLASK_URL;

function PredictForm({ onPredictionUpdate }) {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(() => {
    return sessionStorage.getItem('prediction') || null;
  });
  const [similarity, setSimilarity] = useState(() => {
    return sessionStorage.getItem('similarity') || null;
  });
  const [preview, setPreview] = useState(() => {
    return sessionStorage.getItem('preview') || null;
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = sessionStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem('prediction', prediction);
    sessionStorage.setItem('similarity', similarity);
    sessionStorage.setItem('preview', preview);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [prediction, similarity, preview, tasks]);


  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const onPredict = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${flask_url}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { prediction_text, similarity } = res.data;
      const constructionStage = prediction_text.replace('The classified construction stage is: ', '');

      // Check if the predicted stage is "Plinth and building"
      if (constructionStage === 'Plinth and building') {
        setPrediction(constructionStage);
        setSimilarity(similarity);

        // Add new task to the to-do list with date and time
        const newTask = {
          id: Date.now(),
          image: preview,
          text: `Prediction: ${constructionStage} - Progress: ${similarity}%`,
          timestamp: new Date().toLocaleString(), // Add the current date and time
        };
        setTasks([...tasks, newTask]);

        // Update only the "PlinthBeam" prediction in the Dashboard
        onPredictionUpdate('PlinthBeam', similarity);
        const history = JSON.parse(localStorage.getItem('predictionHistory')) || [];
        history.push(newTask);
        localStorage.setItem('predictionHistory', JSON.stringify(history));
      } else {
        await axios.post(`${flask_url}/delete`, { message: -1 });
        alert('The image is incorrect');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  const openImageModal = (image) => {
    setModalImage(image);
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  return (
    <div className="main-container">
      <div className="todo-list">
        <h2>Progression Rate:</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span onClick={() => openImageModal(task.image)} className="task-image-icon">🖼️</span>
              <span>{task.text}</span>
              <span className="task-timestamp">{task.timestamp}</span> {/* Display date and time */}
            </li>
          ))}
        </ul>
      </div>

      <div className="predict-form-container">
        <h1>Plinth and building</h1>
        <input type="file" id="fileInput" onChange={onFileChange} accept="image/*" />
        <label htmlFor="fileInput" className="upload-button">Upload Image</label>
        {preview && (
          <div>
            <h3>Image Preview:</h3>
            <img src={preview} alt="Selected file preview" className="preview-image" />
          </div>
        )}
        <button onClick={onPredict} className="predict-button">Predict</button>
        {prediction && similarity !== null && (
          <div>
            <h3>Predicted Progress:</h3>
            <pre>{prediction} - {similarity}%</pre>
          </div>
        )}
      </div>

      {modalImage && (
        <div className="modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeImageModal}>&times;</span>
            <img src={modalImage} alt="Full-size preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictForm;
