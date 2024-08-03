import React, { useState, useEffect, useRef } from 'react';
import './../shorts/Lapper.css';

const carColors = ["red", "blue", "green", "yellow"];
const baseSpeeds = [0.8, 1.2, 1, 1.5]; // Base speeds for different cars

// Cubic Bezier curve commands for a simplified Spa-Francorchamps track
const trackPath = `
  M 100,300 
  C 150,100 250,100 300,150 
  S 400,200 500,200 
  S 600,300 550,400 
  S 400,500 300,450 
  S 150,400 100,300
`;

// Function to get car speed based on position
const getCarSpeed = (position, baseSpeed) => {
  const slowDownFactor = 0.5;
  // Example slowdown regions (these should be based on actual track data)
  const slowDownRegions = [
    { start: 0.1, end: 0.3 },
    { start: 0.6, end: 0.8 }
  ];

  let speed = baseSpeed;
  slowDownRegions.forEach(region => {
    if (position >= region.start && position <= region.end) {
      speed *= slowDownFactor;
    }
  });

  return speed;
};

const App = () => {
  const [carPositions, setCarPositions] = useState(carColors.map(() => 0));
  const [lapTimes, setLapTimes] = useState(carColors.map(() => []));
  const lapStartTimes = useState(carColors.map(() => Date.now()));
  const pathRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (pathRef.current) {
        setCarPositions((prevPositions) => {
          return prevPositions.map((position, index) => {
            const speed = getCarSpeed(position, baseSpeeds[index]);
            const newPosition = position + speed * 0.0005;
            if (newPosition >= 1) {
              const lapTime = (Date.now() - lapStartTimes[0][index]) / 1000;
              lapStartTimes[0][index] = Date.now();
              setLapTimes((prevLapTimes) => {
                const newLapTimes = [...prevLapTimes];
                newLapTimes[index] = [...newLapTimes[index], lapTime.toFixed(2)];
                return newLapTimes;
              });
            }
            return newPosition % 1;
          });
        });
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="App">
      <h1>Spa-Francorchamps Simulation</h1>
      <svg width="700" height="500">
        <path
          ref={pathRef}
          d={trackPath}
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
        {carColors.map((color, index) => {
          if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            const segmentLength = length * carPositions[index];
            const point = pathRef.current.getPointAtLength(segmentLength);
            return <circle key={color} cx={point.x} cy={point.y} r="10" fill={color} />;
          }
          return null;
        })}
      </svg>
      <div className="lap-times">
        {carColors.map((color, index) => (
          <div key={color} className="lap-time-container">
            <h2>{color.charAt(0).toUpperCase() + color.slice(1)} Car Lap Times</h2>
            <ul>
              {lapTimes[index].map((time, lapIndex) => (
                <li key={lapIndex}>{time}s</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
