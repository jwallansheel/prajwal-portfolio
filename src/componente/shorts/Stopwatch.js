import React, { useState, useEffect } from 'react';
import './Stopwatch.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [running, setRunning] = useState(false);
  const navigate = useNavigate(); // Corrected hook for navigation

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10ms
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const startStopwatch = () => setRunning(true);
  const stopStopwatch = () => setRunning(false);
  const resetStopwatch = () => {
    setTime(0);
    setRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10); // Convert to milliseconds

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  const handleNext = () => {
    navigate('/Lapper'); // Corrected navigation
  };

  return (
    <div>
      <div className='stopwatch-container'>This is a simple Stopwatch</div>
      <div className="stopwatch-container">
        <div className="stopwatch-display">
          <h1 className="time-display">
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}:
            {String(milliseconds).padStart(2, '0')}
          </h1>
        </div>
        <div className="button-container">
          <button onClick={startStopwatch}>Start</button>
          <button onClick={stopStopwatch}>Stop</button>
          <button onClick={resetStopwatch}>Reset</button>
        </div>
        <div className="button-container">
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
