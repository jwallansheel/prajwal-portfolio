import React, { useState, useEffect, useRef } from "react";

const Flapper = () => {
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(200); // Bird's Y position
  const [birdVelocity, setBirdVelocity] = useState(0); // Bird's vertical velocity
  const [pipes, setPipes] = useState([]); // Array to store pipes
  const [score, setScore] = useState(0); // Player's score
  const [isGameOver, setIsGameOver] = useState(false);

  const gravity = 0.5; // Gravity value
  const jumpStrength = -10; // How high the bird jumps

  // Start the game loop
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    let animationFrameId;

    const render = () => {
      updateGame(); // Update game state
      drawGame(context); // Draw the game
      animationFrameId = requestAnimationFrame(render);
    };

    render(); // Start the game

    return () => cancelAnimationFrame(animationFrameId); // Cleanup
  }, [birdY, pipes]);

  // Handle spacebar press for jumping
  useEffect(() => {
    const handleSpacebarPress = (e) => {
      if (e.code === "Space") {
        if (isGameOver) {
          restartGame();
        } else {
          setBirdVelocity(jumpStrength); // Bird jumps
        }
      }
    };

    window.addEventListener("keydown", handleSpacebarPress);

    return () => window.removeEventListener("keydown", handleSpacebarPress);
  }, [isGameOver]);

  // Update game state
  const updateGame = () => {
    if (isGameOver) return;

    // Update bird position
    setBirdY((prevY) => {
      let newY = prevY + birdVelocity;
      setBirdVelocity((v) => v + gravity); // Apply gravity
      return newY;
    });

    // Update pipes
    setPipes((prevPipes) => {
      let newPipes = prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - 3, // Move pipes to the left
      }));

      // Remove pipes that are off-screen
      if (newPipes.length && newPipes[0].x < -50) {
        newPipes.shift();
        setScore((s) => s + 1); // Increase score
      }

      // Generate new pipes
      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < 300) {
        const pipeHeight =
          Math.random() * (canvasRef.current.height - 100) + 50;
        newPipes.push({
          x: 500,
          height: pipeHeight,
        });
      }

      return newPipes;
    });

    // Check for collisions
    checkCollision();
  };

  // Draw game elements
  const drawGame = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(100, birdY, 20, 0, Math.PI * 2); // Bird is a circle
    ctx.fill();

    // Draw pipes
    pipes.forEach((pipe) => {
      ctx.fillStyle = "green";
      ctx.fillRect(pipe.x, 0, 50, pipe.height); // Top pipe
      ctx.fillRect(pipe.x, pipe.height + 150, 50, canvasRef.current.height); // Bottom pipe
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 20, 50);

    // Game over text
    if (isGameOver) {
      ctx.fillStyle = "red";
      ctx.fillText("Game Over!", 150, 200);
    }
  };

  // Check for collisions
  const checkCollision = () => {
    // Bird hitting the ground or going out of bounds
    if (birdY > canvasRef.current.height || birdY < 0) {
      setIsGameOver(true);
    }

    // Bird hitting a pipe
    pipes.forEach((pipe) => {
      if (
        100 > pipe.x &&
        100 < pipe.x + 50 &&
        (birdY < pipe.height || birdY > pipe.height + 150)
      ) {
        setIsGameOver(true);
      }
    });
  };

  // Restart the game
  const restartGame = () => {
    setBirdY(200);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border-4 border-black bg-sky-200"
      />
      <div className="mt-4 text-lg">
        <p className="text-center text-white">Press Space to Jump</p>
        {isGameOver && (
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-600"
            onClick={restartGame}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Flapper;
