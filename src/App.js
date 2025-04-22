import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import TeaType from "./components/TeaType";
import IcePanel from "./components/IcePanel";
import HeatPanel from "./components/HeatPanel";
import Poster from "./components/Poster";

const fonts = ['Serif', 'Cursive', 'Monospace'];
const teas = [
  { name: 'Green Tea', image: process.env.PUBLIC_URL + '/images/Green.png' },
  { name: 'Oolong Tea', image: process.env.PUBLIC_URL + '/images/Oolong.png' },
  { name: 'Jasmine Tea', image: process.env.PUBLIC_URL + '/images/Jasmine.png' },
  { name: 'Dragon Well', image: process.env.PUBLIC_URL + '/images/Dragonwell.png' },
  { name: 'Yinzhen', image: process.env.PUBLIC_URL + '/images/Yinzhen.png' }
];


function App() {
  const [tea, setTea] = useState(() => {
    const savedTea = localStorage.getItem('tea');
    return savedTea ? JSON.parse(savedTea) : teas[0];
  });
  
  const [iceCount, setIceCount] = useState(() => {
    return parseInt(localStorage.getItem('iceCount')) || 0;
  });
  
  const [temperature, setTemperature] = useState(() => {
    return parseInt(localStorage.getItem('temperature')) || 100;
  });

  const [showInstructions, setShowInstructions] = useState(false);
  

  useEffect(() => {
    localStorage.setItem('tea', JSON.stringify(tea));
  }, [tea]);
  
  useEffect(() => {
    localStorage.setItem('iceCount', iceCount);
  }, [iceCount]);
  
  useEffect(() => {
    localStorage.setItem('temperature', temperature);
  }, [temperature]);
  

  const handleDrop = (e) => {
    // e.preventDefault();
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

  const posterRef = useRef(null);
  const handleDownload = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const link = document.createElement('a');
      link.download = 'tea-poster.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="app"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bkgd.png'})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover', // 可改为 'contain' or 'cover' 看需求
      backgroundPosition: 'center',
    }}>
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
        <div className="poster-section" ref={posterRef}>
          <Poster
            tea={tea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            temperature={temperature}
          />
        </div>
      </div>

      {showInstructions && (
        <div className="instruction-panel">
          <button className="close-btn" onClick={() => setShowInstructions(false)}>✖</button>
          <h2>Welcome to Tea Poster Maker!</h2>
          This app is designed for tea lovers who want to create personalized cards featuring their favorite teas.
          Users can choose from a variety of tea types, adjust the temperature, add ice, and customize the font style to design a unique tea poster.
          Once finished, the card can be downloaded and shared. It is perfect for tea-themed tags and social media posts.
          <h3>How to make your tea poster:</h3>
          <ul>
            <li>1. Select your favorite tea type.</li>
            <li>2. Drag in ice cubes to chill your tea.</li>
            <li>3. Tap the heat panel to warm it up.</li>
            <li>4. Download your personalized tea poster.</li>
          </ul>
        </div>
      )}

      <div className="button-group">
        <button className="instruction-button" onClick={() => setShowInstructions(true)}>
          Instruction
        </button>
        <button className="download-button" onClick={handleDownload}>
          Download Poster
        </button>
      </div>
      
      <footer className="footer">
        <p>Made with 🍵 & love · 2025. Contact: <a href="mailto:cwching@umich.edu">cwching@umich.edu</a>
        </p>
        <p>Background image: <a href = 'https://pngtree.com/freebackground/matcha-green-tea-background_1435220.html'> https://pngtree.com/freebackground/matcha-green-tea-background_1435220.html</a></p>
      </footer>
    </div>
  );
}

export default App;
