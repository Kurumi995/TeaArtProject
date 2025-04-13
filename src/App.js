import React, { useState } from 'react';
import './App.css';
import TeaType from "./components/TeaType";
import IcePanel from "./components/IcePanel";
import HeatPanel from "./components/HeatPanel";
import Poster from "./components/Poster";

const fonts = ['Serif', 'Cursive', 'Monospace'];
const teas = [
  { name: 'Green Tea', image: '/images/Green.png' },
  { name: 'Oolong Tea', image: '/images/Oolong.png' },
  { name: 'Jasmine Tea', image: '/images/Jasmine.png' },
  { name: 'Dragon Well', image: '/images/Dragonwell.png' },
  { name: 'Yinzhen', image: '/images/Yinzhen.png' }
];

function App() {
  const [tea, setTea] = useState(teas[0]);
  const [iceCount, setIceCount] = useState(0);
  const [temperature, setTemperature] = useState(100); 

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'cold') {
      setIceCount((prev) => prev + 1);
      setTemperature((prev) => Math.max(0, prev - 10));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleHeatClick = () => {
    setTemperature((prev) => Math.min(100, prev + 5));
  };  

  return (
    <div className="app">
      <h1>🍵 Tea Poster Maker</h1>

      <div className="row">
        {teas.map((t) => (
          <TeaType
            key={t.name}
            tea={t}
            isSelected={tea.name === t.name}
            onSelect={setTea}
          />
        ))}
      </div>
      <div className="tea-grid">
        <IcePanel iceCount={iceCount} />
        <HeatPanel temperature={temperature} onHeat={handleHeatClick} />

        <div className="poster-section">
          <Poster
            tea={tea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            temperature={temperature}
          />
        </div>
      </div>


    </div>
  );
}

export default App;
