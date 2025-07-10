// --- StagesList.jsx ---
import React from 'react';
import './Styles/stageslist.css'; // Ensure you have the correct path to your CSS file

const StagesList = ({ stageContent, selectedStage, setSelectedStage, progressionRate }) => {
  return (
    <div className="stages-list">
      <h3 className="stages-title">Stages</h3>
      {(stageContent || []).map((stage, idx) => (
        <div
          key={stage.id || stage.stage || idx}
          className={`stage-card ${selectedStage === stage.stage ? 'selected' : ''}`}
          onClick={() => setSelectedStage(stage.stage)}
        >
          <div className="stage-name">{stage.stage}</div>
          <div className="stage-tasks">Tasks: {progressionRate[stage.stage] || 0}</div>
        </div>
      ))}
    </div>
  );
};

export default StagesList;
