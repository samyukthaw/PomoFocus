import React, { useState, useEffect } from 'react';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtnClicked from "./assets/work-clicked.png";
import workBtn from "./assets/work.png";
import breakBtnClicked from "./assets/break-clicked.png";
import breakBtn from "./assets/break.png";
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.png";
import closeBtn from "./assets/close.png";

function App() {

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);
  const [gifImage, setGifImage] = useState(idleGif);
  const [isBreak, setIsBreak] = useState(false);
  const [image, setImage] = useState(playImg);
  

  useEffect(() => {
  if (!isRunning) return;

  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isRunning]);

 

  // set initial switch mode to false
  useEffect(() => {
    switchMode(false);
  }, [])

  // meow sound
useEffect(() => {
  if (timeLeft === 0) {
    setIsRunning(false);
    setImage(playImg);
    setGifImage(idleGif);
  }
}, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkButtonImage(breakMode ? workBtn : workBtnClicked);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    setGifImage(idleGif);
  }

 

  const handleClick = () => {
  console.log("start pressed");

  if (!isRunning) {
    setIsRunning(true);
    setGifImage(isBreak ? breakGif : workGif);
    setImage(resetImg);
  } else {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    setGifImage(idleGif);
    setImage(playImg);
  }
};
  

const handleCloseClick = () => {
 if ((window as any).electronAPI?.closeApp) {
  (window as any).electronAPI.closeApp();
} else {
    console.warn("Electron API not available");
  }
}

  const containerClass = `home-container ${isRunning ? "background-green" : ""}`;
  return (
    <div className={containerClass} style={{ position: 'relative' }}>
      <div>
        <button className="close-button" onClick={handleCloseClick}>
          <img src={closeBtn} alt = "Close" />
        </button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" onClick={() => switchMode(false)}>
            <img src={workButtonImage} alt="Work" />
          </button>
          <button className="image-button" onClick={() => switchMode(true)}>
            <img src={breakButtonImage} alt="Break" />
          </button>
        </div>

        <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
          { encouragement }
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>
        <img src={gifImage} alt="Timer Status" className="gif-image" />
        <button className="home-button" onClick={handleClick}>
          <img src={image} alt="Button Icon" />
        </button>
      </div>
    </div>
  );
}

export default App;
