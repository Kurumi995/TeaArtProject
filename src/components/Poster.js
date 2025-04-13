import React from 'react';
import './Poster.css';

const Poster = ({ tea, onDrop, onDragOver, temperature }) => {
  const backgroundColor =
    temperature > 70 ? '#ffe5e5' : temperature > 50 ? '#fff6d1' : temperature > 20 ? '#e5ffe5' : '#e1f5ff';
  return (
    <div
      className="tea-poster"
      style={{ backgroundColor }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <img src={tea.image} alt={tea.name} className="tea-poster-img" />
      <h2>
        {temperature > 50
            ? `Hot ${tea.name}`:
            temperature > 20
            ? `Warm ${tea.name}`:
            `Cold ${tea.name}`
        }
    </h2>

      <p className="tea-desc">
      This is a cup of <strong>{temperature > 50
            ? `Hot ${tea.name}`:
            temperature > 20
            ? `Warm ${tea.name}`:
            `Cold ${tea.name}`}</strong>. <br />Enjoy the moment 🍃
      </p>
    </div>
  );
};

export default Poster;
