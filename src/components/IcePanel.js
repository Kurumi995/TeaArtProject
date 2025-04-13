import React from 'react';
import './IcePanel.css';

const IcePanel = ({ iceCount }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'cold');
  };

  return (
    <div className="ice-section">
      <div className="ice-label"><strong>Add Ice</strong></div>
      <div className="ice-counter">Ice Cubes: {iceCount}</div>
      <div
        className="draggable-ice"
        draggable
        onDragStart={handleDragStart}
      >
        🧊
      </div>
    </div>
  );
};

export default IcePanel;
