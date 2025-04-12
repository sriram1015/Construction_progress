import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Stage.css';

const flask_url = import.meta.env.VITE_FLASK_URL;

const stagesData = [
  { id: 'FOUNDATION', title: 'Foundation' },
  { id: 'PLINTH AND BUILDING', title: 'Plinth and building' },
  { id: 'LINTEL', title: 'Lintel' },
  { id: 'ROOFING', title: 'Roofing' },
  { id: 'PLASTERING', title: 'Plastering' },
  { id: 'FLOORING', title: 'Flooring' },
  { id: 'PAINTING', title: 'Painting' },
];

function Stages() {
  const [selectedStage, setSelectedStage] = useState('Foundation');
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(() => sessionStorage.getItem('prediction') || null);
  const [similarity, setSimilarity] = useState(() => sessionStorage.getItem('similarity') || null);
  const [preview, setPreview] = useState(() => sessionStorage.getItem('preview') || null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = sessionStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Save data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('prediction', prediction);
    sessionStorage.setItem('similarity', similarity);
    sessionStorage.setItem('preview', preview);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [prediction, similarity, preview, tasks]);

  // Handle file input change
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

  // Handle prediction
  const onPredict = async () => {
    if (!file) {
      toast.error('Please select a file first.', { position: 'top-center', autoClose: 2000 });
      return;
    }

    setIsLoading(true); // Start loading
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

      if (constructionStage === selectedStage) {
        setPrediction(constructionStage);
        setSimilarity(similarity);

        const newTask = {
          id: Date.now(),
          image: preview,
          text: `Prediction: ${constructionStage} - Progress: ${similarity}%`,
          timestamp: new Date().toLocaleString(),
        };
        setTasks([...tasks, newTask]);

        toast.success('Prediction successful!', { position: 'top-center' , autoclose: 2000});
      } else {
        await axios.post(`${flask_url}/delete`, { message: -1 });
        toast.error('The image does not match the selected stage.', { position: 'top-center', autoclose: 2000 });
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      toast.error('An error occurred during prediction. Please try again.', { position: 'top-center' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Open image modal
  const openImageModal = (image) => {
    setModalImage(image);
  };

  // Close image modal
  const closeImageModal = () => {
    setModalImage(null);
  };

  return (
    <div className="main-container">
      <div className="side-nav">
        {stagesData.map((stage) => (
          <button
            key={stage.id}
            className={`nav-button ${selectedStage === stage.id ? 'active' : ''}`}
            onClick={() => setSelectedStage(stage.id)}
          >
            {stage.title}
          </button>
        ))}
      </div>

      {/* Content for Selected Stage */}
      <div className="predictcontent">
        <h1>{selectedStage}</h1>
        <div className="predict-form-container">
          <input type="file" id="fileInput" onChange={onFileChange} accept="image/*" />
          <label htmlFor="fileInput" className="upload-button">Upload Image</label>

          {preview && (
            <div>
              <h3>Image Preview:</h3>
              <img src={preview} alt="Selected file preview" className="preview-image" />
            </div>
          )}

          <button onClick={onPredict} className="predict-button" disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
          {prediction && similarity !== null && (
            <div>
              <h3>Predicted Progress:</h3>
              <pre>{prediction} - {similarity}%</pre>
            </div>
          )}
        </div>
      </div>

      <div className="todo-list">
        <h2>Progression Rate:</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span onClick={() => openImageModal(task.image)} className="task-image-icon">🖼️</span>
              <span>{task.text}</span>
              <span className="task-timestamp">{task.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {modalImage && (
        <div className="modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeImageModal}>&times;</span>
            <img src={modalImage} alt="Full-size preview" className="modal-image" />
          </div>
        </div>
      )}
<ToastContainer autoClose={2000} />
    </div>
  );
}

export default Stages;