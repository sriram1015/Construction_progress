import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../Auth/UseContext'; // Import UserContext
import 'react-toastify/dist/ReactToastify.css';
import './Stage.css';

const node_url = import.meta.env.VITE_NODE_URL;
const flask_url = import.meta.env.VITE_FLASK_URL;
function Stages() {
  const { user } = useContext(UserContext); // Access logged-in user details
  const [roles, setRoles] = useState([]); // Roles assigned to the user
  const [selectedStage, setSelectedStage] = useState(''); // Selected stage
  const [title, setTitle] = useState(''); // Role title
  const [file, setFile] = useState(null); // File input state
  const [preview, setPreview] = useState(null); // Image preview
  const [isLoading, setIsLoading] = useState(false); // Loading state for prediction
  const [prediction, setPrediction] = useState(null); // Prediction result
  const [similarity, setSimilarity] = useState(null); // Similarity percentage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = sessionStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [progressionRate, setProgressionRate] = useState({}); // Progression rate for each stage
  const [modalImage, setModalImage] = useState(null); // Modal for image preview

  // Save tasks and other data to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    sessionStorage.setItem('prediction', prediction);
    sessionStorage.setItem('similarity', similarity);
    sessionStorage.setItem('preview', preview);
  }, [tasks, prediction, similarity, preview]);

  // Fetch roles assigned to the logged-in user
  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) {
        toast.error('Please log in to view your stages.', { position: 'top-center', autoClose: 2000 });
        return;
      }

      try {
        const response = await axios.get(`${node_url}/add/roles/user`, {
          params: { username: user.username }, // Pass the logged-in user's username
        });
        console.log('Fetched User Roles:', response.data); // Debugging log
        setRoles(response.data);

        // Set the first role and stage as default if available
        if (response.data.length > 0) {
          setTitle(response.data[0].title);
          if (response.data[0].stageContent.length > 0) {
            setSelectedStage(response.data[0].stageContent[0].stage);
          }
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        toast.error('Failed to load roles for the logged-in user.', { position: 'top-center', autoClose: 2000 });
      }
    };

    fetchUserRoles();
  }, [user]); // Re-run when the logged-in user changes

  // Update progression rate whenever tasks change
  useEffect(() => {
    const calculateProgressionRate = () => {
      const rate = {};
      roles.forEach((role) => {
        role.stageContent.forEach((stage) => {
          const stageTasks = tasks.filter((task) => task.stage === stage.stage);
          const completedTasks = stageTasks.length;
          rate[stage.stage] = completedTasks; // Store the progression rate for each stage
        });
      });
      setProgressionRate(rate);
    };

    calculateProgressionRate();
  }, [tasks, roles]);

  // Handle file input change
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Set the preview image
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
    formData.append('selectedStage', selectedStage);

    try {
      const response = await axios.post(`${flask_url}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { prediction_text, similarity } = response.data;
      const constructionStage = prediction_text.replace('The classified construction stage is: ', '');

      if (constructionStage === selectedStage) {
        setPrediction(constructionStage);
        setSimilarity(similarity);

        const newTask = {
          id: Date.now(),
          stage: selectedStage,
          image: preview,
          text: `Prediction: ${constructionStage} - Progress: ${similarity}%`,
          timestamp: new Date().toLocaleString(),
        };
        setTasks([...tasks, newTask]);

        toast.success('Prediction successful!', { position: 'top-center', autoClose: 2000 });
      } else {
        toast.error('The image does not match the selected stage.', { position: 'top-center', autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      toast.error('Prediction failed. Please try again.', { position: 'top-center', autoClose: 2000 });
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
      <div>
      <h3>{title}</h3>

      <h4>Logged in as: {user?.username || 'Guest'}</h4> 
      </div>
        {roles.map((role, index) => (
          <div key={index}>
            {role.stageContent.map((stage, idx) => (
              <button
                key={idx}
                className={`nav-button ${selectedStage === stage.stage ? 'active' : ''}`}
                onClick={() => setSelectedStage(stage.stage)}
              >
                {stage.stage} - Progress: {progressionRate[stage.stage] || 0} tasks
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Content for Selected Stage */}
      <div className="predictcontent">
        <h1>{selectedStage || 'Select a Stage'}</h1>
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
              <h3>Prediction Result:</h3>
              <p>{prediction} - {similarity}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Progression Rate */}
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

      {/* Modal for Image Preview */}
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