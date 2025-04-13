import React from 'react';
import './TeaType.css';

const TeaType = ({ tea, isSelected, onSelect }) => {
  return (
    <div
      className={`tea-option ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(tea)}
    >
      <img src={tea.image} alt={tea.name} />
      <p>{tea.name}</p>
    </div>
  );
};

export default TeaType;
