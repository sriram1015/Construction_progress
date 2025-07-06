import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Auth/UseContext';
import { useNavigate } from 'react-router-dom';

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
        // Ensure every job has username included
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
    return <div className="text-center mt-10">Please login to view your jobs.</div>;
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Assigned Jobs</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {jobs.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded">
          <ul className="list-disc pl-5">
            {jobs.map((job, index) => (
              <li key={index} className="mb-4">
                <strong>Title:</strong> {job.title} <br />
                {job.image && (
                  <>
                    <strong>Image:</strong>{' '}
                    <img src={job.image} alt="Job" style={{ maxWidth: 100 }} />
                    <br />
                  </>
                )}
                <strong>Stages:</strong>
                <ul className="ml-4">
                  {job.stageContent &&
                    Object.entries(job.stageContent).map(([stage, value]) => (
                      <li key={stage}>
                        <strong>{stage}:</strong> {value}
                      </li>
                    ))}
                </ul>
                <button
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleGoToStages(job)}
                >
                  Go to Stages
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : !loading && !error ? (
        <div>No jobs found.</div>
      ) : null}
    </div>
  );
};

export default GetUserJobs;
