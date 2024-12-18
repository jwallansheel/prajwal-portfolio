import React, { useState, useCallback, useRef } from "react";

const numRows = 30;
const numCols = 30;

// Helper function to generate an empty grid
const createEmptyGrid = () => {
  return Array.from({ length: numRows }).map(() =>
    Array.from({ length: numCols }).fill(0)
  );
};

// Neighbor positions for checking surrounding cells
const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const Grid = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  // Use state for population and generation
  const [population, setPopulation] = useState(0);
  const [generation, setGeneration] = useState(0);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      const newGrid = g.map((row) => [...row]); // Create a new grid to avoid mutating state
      let newPopulation = 0;
      let newGeneration = generation; // Keep track of the new generation

      newGrid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newRow = rowIndex + x;
            const newCol = colIndex + y;
            if (
              newRow >= 0 &&
              newRow < numRows &&
              newCol >= 0 &&
              newCol < numCols
            ) {
              neighbors += g[newRow][newCol];
            }
          });

          if (g[rowIndex][colIndex] === 1 && (neighbors < 2 || neighbors > 3)) {
            // Cell dies
            newGrid[rowIndex][colIndex] = 0;
          } else if (g[rowIndex][colIndex] === 0 && neighbors === 3) {
            // Cell becomes alive
            newGrid[rowIndex][colIndex] = 1;
            newPopulation++; // Increment population when a new cell is born
            newGeneration++; // Increment generation when a new cell is born
          } else {
            newPopulation += g[rowIndex][colIndex]; // Count alive cells
          }
        });
      });

      // Update population and generation states
      setPopulation(newPopulation);
      setGeneration(newGeneration);
      return newGrid;
    });

    setTimeout(runSimulation, 100);
  }, [generation]); // Add generation as a dependency

  return (
    <div className="w-screen bg-black min-h-screen grid justify-center flex-col">
      <div className="absolute inset-y-0 left-10 flex flex-col justify-center gap-6 z-10">
        {["My Resume'", "What's the point?", "My Vision"].map((tab, idx) => (
          <div
            key={idx}
            className="floating-tab group relative bg-white w-60 h-60 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-110"
          >
            <img
              src={`path_to_image_${idx}.jpg`} // Replace with actual image paths
              alt={`Preview of ${tab}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm">{tab}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
        className="bg-blue-500 border-1 p-4 m-5 rounded-lg"
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setGrid(createEmptyGrid());
          setPopulation(0); // Reset population when grid is reset
          setGeneration(0); // Reset generation when grid is reset
        }}
        className="bg-blue-500 border-1 p-4 m-5 rounded-lg"
      >
        Reset
      </button>
      <button
        onClick={() => {
          const newGrid = Array.from({ length: numRows }).map(() =>
            Array.from({ length: numCols }).map(() =>
              Math.random() > 0.7 ? 1 : 0
            )
          );
          setGrid(newGrid);
          setPopulation(newGrid.flat().filter((cell) => cell === 1).length); // Calculate initial population
          setGeneration(0); // Reset generation when grid is randomized
        }}
        className="bg-blue-500 border-1 p-4 m-5 rounded-lg"
      >
        Randomize
      </button>
      <div className="bg-blue-500 border-1 p-4 m-5 rounded-lg">
        Population: {population} | Generation: {generation}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
                setGrid(newGrid);
                // Update population when toggling cells
                setPopulation(
                  newGrid.flat().filter((cell) => cell === 1).length
                );
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[rowIndex][colIndex] ? "white" : undefined,
                border: "solid 1px grey",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
