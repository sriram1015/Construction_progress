import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Auth/UseContext';
import { useNavigate } from 'react-router-dom';
import './listdata.css';

const node_url = import.meta.env.VITE_NODE_URL;

const GetUserJobs = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.username) return;
      setLoading(true);
      setError('');
      setJobs([]);
      try {
        const response = await axios.get(`${node_url}/user/job?username=${user.username}`);
        const jobsWithUsername = response.data.map((job) => ({
          ...job,
          username: user.username
        }));
        setJobs(jobsWithUsername);
      } catch (err) {
        setError(err.response?.data?.message || 'Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  if (!user || !user.username) {
    return <div className="login-prompt">Please login to view your jobs.</div>;
  }

  const handleGoToStages = (job) => {
    if (job?.username && job?.title) {
      sessionStorage.setItem('selectedJob', JSON.stringify(job));
      navigate('/stages', { state: { job } });
    } else {
      alert('Job data is incomplete.');
    }
  };

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Assigned Jobs</h2>
      {loading && <div className="loading-text">Loading...</div>}
      {error && <div className="error-text">{error}</div>}
      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-stages">
                <h3 className="job-title">{job.title}</h3>
                <div className="stages-container">
                  {job.stageContent && Object.entries(job.stageContent).map(([stage, value]) => (
                    <div key={stage} className="stage-item">
                      <span className="stages-name">{stage}:</span>
                      <span className="stages-value">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="view-stages-btn"
                  onClick={() => handleGoToStages(job)}
                >
                  Go to Stages
                </button>
              </div>
              {job.image && (
                <div className="job-image-container">
                  <img 
                    src={job.image} 
                    alt={`${job.title} visual`} 
                    className="job-image" 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="no-jobs-text">No jobs found.</div>
      ) : null}
    </div>
  );
};

export default GetUserJobs;

