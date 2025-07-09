// --- PredictionDetails.jsx ---
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


import './PredictionDetails.css';

import StagesList from '../component/StagesList';
import PredictionForm from '../component/PredictionForm';
import TaskHistory from '../component/TaskHistory';



const node_url = import.meta.env.VITE_NODE_URL;
const flask_url = import.meta.env.VITE_FLASK_URL;

function PredictionDetails() {
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
    <div className="main-page">
      <header className="main-header">
        <div className="header-left">
          <h1 >{job?.title || 'Construction Tracker'}</h1>
          <h5> user: {job?.username || 'Guest'}</h5>
        </div>
        <div className="header-right">
          <h3 className="username">Logged in as: {job?.username || 'Guest'}</h3>
          <div className="progress-summary">
            <p className='progress1'>Total Tasks Completed: <span>{totalTasksCompleted}</span></p>
            <p className='progress3'>Overall Progress: <span>{totalProgressPercentage}%</span></p>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <StagesList stageContent={stageContent} selectedStage={selectedStage} setSelectedStage={setSelectedStage} progressionRate={progressionRate} />

        <PredictionForm
          file={file}
          preview={preview}
          onFileChange={onFileChange}
          onPredict={onPredict}
          isLoading={isLoading}
          prediction={prediction}
          similarity={similarity}
        />

        <TaskHistory tasks={tasks} openImageModal={openImageModal} />
      </div>
    </div>
  );
};

export default PredictionDetails;
