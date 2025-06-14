import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Stage.css';

const node_url = import.meta.env.VITE_NODE_URL;
const flask_url = import.meta.env.VITE_FLASK_URL;

function Stages() {
  const location = useLocation();
  const job = location.state?.job || JSON.parse(sessionStorage.getItem('selectedJob') || 'null');
  const [stageContent, setStageContent] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [title, setTitle] = useState(job?.title || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [similarity, setSimilarity] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = sessionStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [progressionRate, setProgressionRate] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [totalProgressPercentage, setTotalProgressPercentage] = useState(0);

  useEffect(() => {
    if (location.state?.job) {
      sessionStorage.setItem('selectedJob', JSON.stringify(location.state.job));
    }
  }, [location.state]);

  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    sessionStorage.setItem('prediction', prediction);
    sessionStorage.setItem('similarity', similarity);
    sessionStorage.setItem('preview', preview);
  }, [tasks, prediction, similarity, preview]);

  useEffect(() => {
    if (!job || !job.username || !job.title) {
      setStageContent([]);
      setTitle('');
      setSelectedStage('');
      return;
    }
    const fetchStages = async () => {
      try {
        const response = await axios.get(`${node_url}/user/job/stages`, {
          params: { username: job.username, title: job.title },
        });
        setStageContent(response.data.stageContent || []);
        setTitle(job.title);
        if (response.data.stageContent && response.data.stageContent.length > 0) {
          setSelectedStage(response.data.stageContent[0].stage);
        } else {
          setSelectedStage('');
        }
      } catch (error) {
        setStageContent([]);
        setSelectedStage('');
        toast.error('Failed to load stages for this job.', { position: 'top-center', autoClose: 2000 });
      }
    };
    fetchStages();
  }, [job]);

  useEffect(() => {
    const rate = {};
    let completedTasks = 0;
    let totalSimilarity = 0;

    stageContent.forEach((stage) => {
      const stageTasks = tasks.filter((task) => task.stage === stage.stage);
      rate[stage.stage] = stageTasks.length;
      completedTasks += stageTasks.length;

      stageTasks.forEach(task => {
        const similarityMatch = task.text.match(/Progress: (\d+)%/);
        if (similarityMatch) {
          totalSimilarity += parseInt(similarityMatch[1], 10);
        }
      });
    });

    setProgressionRate(rate);
    setTotalTasksCompleted(completedTasks);

    const avgProgress = tasks.length > 0 ? (totalSimilarity / tasks.length) : 0;
    setTotalProgressPercentage(avgProgress.toFixed(1));
  }, [tasks, stageContent]);

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
      toast.error('Please select a file first.', { position: 'top-center', autoClose: 2000 });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('selectedStage', selectedStage);
    formData.append('username', job.username);
    formData.append('title', title);

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
      setIsLoading(false);
    }
  };

  const openImageModal = (image) => {
    setModalImage(image);
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  const uppertitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : '';

  if (!job || !job.username || !job.title) {
    return (
      <div className="text-center mt-10">
        No job selected. Please go back and select a job from your list.
      </div>
    );
  }

  if (!stageContent.length) {
    return (
      <div className="text-center mt-10">
        No stages found for this job.
        <ToastContainer autoClose={2000} />
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className='header'>
        <h3 className="project-title">{uppertitle || 'Construction Progress Tracker'}</h3>
        <div className="header-content">
          <div className="user-info">
            <h4 className="username">Logged in as: {job?.username || 'Guest'}</h4>
            <div className="progress-summary">
              <p className='progress1'>Total Tasks Completed:</p>
              <span className='progress2'> {totalTasksCompleted}</span>
              <p className='progress3'>Overall Progress:</p>
              <span className='progress4'> {totalProgressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="side-nav">
        {stageContent.map((stage, idx) => (
          <button
            key={idx}
            className={`nav-button ${selectedStage === stage.stage ? 'active' : ''}`}
            onClick={() => setSelectedStage(stage.stage)}
          >
            <span className="stage-name">{stage.stage}</span>
            <span className="stage-progress">Progress: {progressionRate[stage.stage] || 0} tasks</span>
          </button>
        ))}
      </div>

      <div className="predictcontent">
        <h1>{selectedStage || 'Select a Stage'}</h1>
        <div className="predict-form-container">
          <div className="form-group">
            <input type="file" id="fileInput" onChange={onFileChange} accept="image/*" />
            <label htmlFor="fileInput" className="upload-button">
              {file ? 'Change Image' : 'Upload Image'}
            </label>
          </div>

          {preview && (
            <div className="preview-section">
              <h3>Image Preview:</h3>
              <img
                src={preview}
                alt="Selected file preview"
                className="preview-image"
                onClick={() => openImageModal(preview)}
              />
            </div>
          )}

          <button onClick={onPredict} className="predict-button" disabled={isLoading || !file}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Predicting...
              </>
            ) : 'Predict'}
          </button>

          {prediction && similarity !== null && (
            <div className="results-section">
              <h3>Prediction Result:</h3>
              <p>
                <strong>Stage:</strong> {prediction} <br />
                <strong>Progress:</strong> {similarity}%
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="todo-list">
        <div className="todo-header">
          <h2>Task History</h2>
          <div className="task-count">{tasks.length} tasks recorded</div>
        </div>
        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span
                  onClick={() => openImageModal(task.image)}
                  className="task-image-icon"
                  title="View image"
                >
                  🖼️
                </span>
                <span className="task-text">{task.text}</span>
                <span className="task-timestamp">{task.timestamp}</span>
              </li>
            ))
          ) : (
            <li className="no-tasks">No tasks recorded yet</li>
          )}
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