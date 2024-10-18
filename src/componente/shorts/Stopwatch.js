import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [running, setRunning] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  // Effect to run the stopwatch
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

  // Format the time for display
  const formatTime = (time) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  const handleNext = () => {
    navigate("/Lapper"); // Navigate to the next page
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <div className="text-6xl font-mono mb-6">
          <span>{String(hours).padStart(2, "0")}:</span>
          <span>{String(minutes).padStart(2, "0")}:</span>
          <span>{String(seconds).padStart(2, "0")}:</span>
          <span className="text-4xl">
            {String(milliseconds).padStart(2, "0")}
          </span>
        </div>
        <div className="space-x-4">
          {running ? (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              onClick={() => setRunning(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
          )}
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
            onClick={() => {
              setTime(0);
              setRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
