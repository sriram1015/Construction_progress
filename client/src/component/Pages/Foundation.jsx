import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PredictForm.css';

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
    const savedTask = sessionStorage.getItem('tasks');
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
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
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { prediction_text, similarity } = res.data;
      const constructionStage = prediction_text.replace('The classified construction stage is: ', '');

      if (constructionStage === 'Foundation') {
        setPrediction(constructionStage);
        setSimilarity(similarity);

        // Add new task to the to-do list with a timestamp
        const newTask = {
          id: Date.now(),
          image: preview,
          text: `Prediction: ${constructionStage} - Progress: ${similarity}%`,
          timestamp: new Date().toLocaleString(), // Add formatted timestamp
        };
        setTasks([...tasks, newTask]);

        // Update the Dashboard predictions
        onPredictionUpdate(constructionStage, similarity);
      } else {
        await axios.post('http://127.0.0.1:5000/delete', { message: -1 });
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
              <span className="task-timestamp">{task.timestamp}</span> {/* Display timestamp */}
            </li>
          ))}
        </ul>

      </div>

      <div className="predict-form-container">
        <h1>Foundation</h1>
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
