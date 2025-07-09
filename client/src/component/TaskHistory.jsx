
// --- TaskHistory.jsx ---
import React from 'react';
import './Styles/taskhistory.css';

const TaskHistory = ({ tasks, openImageModal }) => {
  return (
    <div className="task-history">
      <h2>Task History</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks recorded</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-img" onClick={() => openImageModal(task.image)}>🖼️</span>
              <div>
                <p>{task.text}</p>
                <small>{task.timestamp}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskHistory;

