import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberType = () => {
  const navigate = useNavigate();

  const handleMemberTypeSelection = (type) => {
    navigate('/login', { state: { memberType: type } });
  };

  return (
    <div>
      <h2>Select Member Type</h2>
      <button onClick={() => handleMemberTypeSelection('Local')}>Local Member</button>
      <button onClick={() => handleMemberTypeSelection('Village')}>Village Member</button>
      <button onClick={() => handleMemberTypeSelection('Zone')}>Zone Member</button>
      <button onClick={() => handleMemberTypeSelection('District')}>District Member</button>
    </div>
  );
};

export default MemberType;
