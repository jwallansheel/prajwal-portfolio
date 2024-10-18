import React, { useState, useEffect, useRef } from "react";
import "./../shorts/Lapper.css";

// F1-inspired car colors
const carColors = [
  "#FF1242",
  "#00D2BE",
  "#0072C6",
  "#F596C8",
  "#E10600",
  "#00B0F0",
  "#B6BABD",
  "#0600EF",
  "#9B0000",
  "#006F62",
  "#0090D2",
  "#005AFF",
  "#DC0000",
  "#44C8F5",
  "#FFFFFF",
  "#3671C6",
  "#C92D4B",
  "#006F62",
  "#2293D1",
  "#005AFF",
];

// Initial speeds for each car
const initialSpeeds = [
  1, 1.2, 1.4, 1.6, 1.8, 2, 1, 1.5, 1.2, 1.4, 1.6, 1.8, 2, 1.5, 1, 1.2, 1.4,
  1.6, 1.8, 2,
];

const App = () => {
  const [carPositions, setCarPositions] = useState(carColors.map(() => 0));
  const [lapTimes, setLapTimes] = useState(carColors.map(() => []));
  const [carSpeeds, setCarSpeeds] = useState(initialSpeeds);
  const lapStartTimes = useRef(carColors.map(() => Date.now()));

  const handleSpeedChange = (index, speed) => {
    setCarSpeeds((prevSpeeds) => {
      const updatedSpeeds = [...prevSpeeds];
      updatedSpeeds[index] = speed;
      return updatedSpeeds;
    });
  };

  useEffect(() => {
    const animate = () => {
      setCarPositions((prevPositions) => {
        return prevPositions.map((position, index) => {
          const newPosition = position + carSpeeds[index] * 0.002;
          if (newPosition >= trackPath.length) {
            const lapTime = (
              (Date.now() - lapStartTimes.current[index]) /
              1000
            ).toFixed(2);
            lapStartTimes.current[index] = Date.now();
            setLapTimes((prevLapTimes) => {
              const updatedLapTimes = [...prevLapTimes];
              updatedLapTimes[index] = [...updatedLapTimes[index], lapTime];
              return updatedLapTimes;
            });
          }
          return newPosition % trackPath.length;
        });
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [carSpeeds]);

  const trackPath = [
    { x: 100, y: 300 },
    { x: 200, y: 100 },
    { x: 300, y: 150 },
    { x: 400, y: 100 },
    { x: 500, y: 200 },
    { x: 550, y: 300 },
    { x: 500, y: 400 },
    { x: 300, y: 450 },
    { x: 200, y: 400 },
    { x: 100, y: 300 },
  ];

  const interpolatePosition = (start, end, t) => ({
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
  });

  const Car = ({ color, position }) => {
    const segmentIndex = Math.floor(position);
    const t = position % 1;
    const start = trackPath[segmentIndex];
    const end = trackPath[(segmentIndex + 1) % trackPath.length];
    const currentPosition = interpolatePosition(start, end, t);

    return (
      <circle
        cx={currentPosition.x}
        cy={currentPosition.y}
        r="10"
        fill={color}
      />
    );
  };

  const LapTimeDisplay = ({ color, lapTimes }) => (
    <div className="lap-time-container bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold" style={{ color }}>
        {color.charAt(0).toUpperCase() + color.slice(1)} Car Lap Times
      </h2>
      <ul className="list-disc pl-4">
        {lapTimes.slice(-5).map((time, lapIndex) => (
          <li key={lapIndex}>{time}s</li>
        ))}
      </ul>
    </div>
  );

  const SpeedSlider = ({ index, speed, onSpeedChange }) => (
    <div className="speed-slider mb-4 flex flex-col items-center">
      <label
        htmlFor={`speed-${index}`}
        className="text-white mb-2"
        style={{ color: carColors[index] }}
      >
        {carColors[index].charAt(0).toUpperCase() + carColors[index].slice(1)}{" "}
        Car Speed
      </label>
      <input
        type="range"
        id={`speed-${index}`}
        className="w-full"
        min="1"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeedChange(index, parseFloat(e.target.value))}
      />
    </div>
  );

  const InformationPanel = () => (
    <div className="info-panel bg-gray-900 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold">Simulation Information</h2>
      <p className="mt-2">
        This is a simulation of the Spa-Francorchamps racing track.
      </p>
      <p className="mt-2">
        Each car has a different speed that can be adjusted using the sliders.
      </p>
      <p className="mt-2">Lap times are recorded and displayed for each car.</p>
      <p className="mt-2">
        Use the simulation to see how different speeds affect lap times!
      </p>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6 flex w-screen flex-row ">
      <header className="text-white text-center mb-8">
        <h1 className="text-4xl font-bold">Spa-Francorchamps Simulation</h1>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="info-section flex flex-col items-center">
          <InformationPanel />
        </div>

        <div className="slider-section flex flex-col items-end">
          {carColors.map((color, index) => (
            <SpeedSlider
              key={color}
              index={index}
              speed={carSpeeds[index]}
              onSpeedChange={handleSpeedChange}
            />
          ))}
        </div>
      </div>

      <div className="track-section sticky top-0 h-screen flex justify-center">
        <svg width="600" height="500" className="race-track">
          <path
            d={`M ${trackPath
              .map((point) => `${point.x} ${point.y}`)
              .join(" L ")}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          {carColors.map((color, index) => (
            <Car key={color} color={color} position={carPositions[index]} />
          ))}
        </svg>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {carColors.map((color, index) => (
          <LapTimeDisplay
            key={color}
            color={color}
            lapTimes={lapTimes[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
