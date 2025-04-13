import React from 'react';
import './HeatPanel.css';

const HeatPanel = ({ temperature, onHeat }) => {
    const icon =
      temperature > 70 ? '🔥🔥🔥' : temperature > 50 ? '🔥🔥' : temperature > 20 ? '🔥' : '❄️';
  
    return (
      <div className="heat-section" onClick={onHeat}>
        <div className="heat-label"><strong>Heat</strong></div>
        <div className="temperature-display">
          Temp: {temperature}° {icon}
        </div>
        <div className="temperature-bar-container">
          <div
            className="temperature-bar"
            style={{ width: `${temperature}%` }}
          />
        </div>
      </div>
      
    );
  };
  
  export default HeatPanel;
  