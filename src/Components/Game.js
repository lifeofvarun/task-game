import React, { useState, useEffect, useRef } from 'react';
import './Game.css'; // Import your CSS file

function Game() {
  const [boxColor, setBoxColor] = useState('red');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [gameStarted, setGameStarted] = useState(false); // Track game start
  const [gameResult, setGameResult] = useState(null); // Track game result (win or lose)
  const timerRef = useRef(null); // Reference to the timer interval
  const [error, setError] = useState(null); // Track errors

  // Logic to change the box color randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setBoxColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));
    }, Math.floor(Math.random() * 1000) + 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Event handler for box click
  const handleBoxClick = () => {
    if (boxColor === 'green') {
      setScore(score + 1);
      setError(null); // Clear errors when the user clicks and scores a point
    }
  };

  // Countdown timer logic
  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup countdown interval on unmount or when the game ends
    return () => clearInterval(countdownInterval);
  };

  // Function to generate a random time interval for changing the box color
  const generateRandomBoxColor = () => {
    const randomInterval = Math.floor(Math.random() * 1000) + 1000; // Random interval between 1 and 2 seconds

    try {
      timerRef.current = setInterval(() => {
        setBoxColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));
      }, randomInterval);
    } catch (err) {
      setError('An error occurred during the game.'); // Handle and set the error state
    }
  };

  // Start generating random box colors when the game starts
  useEffect(() => {
    if (gameStarted) {
      setError(null); // Clear errors when the game starts
      generateRandomBoxColor();
    }
  }, [gameStarted]);

  const startGame = () => {
    setError(null); // Clear errors when the game starts
    setGameStarted(true); // Set game as started
    generateRandomBoxColor(); // Start color-changing logic
    startCountdown(); // Start countdown timer

    // Clear any existing timer interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Modified endGame function to handle win and lose conditions
  const endGame = (isWin) => {
    setGameStarted(false); // Set the game as not active
    clearInterval(timerRef.current); // Clear the timer interval
    setGameResult(isWin ? 'win' : 'lose');
    if (isWin) {
      // Display a custom win message
      // You can customize this message as needed
      console.log('Congratulations! You win!');
    } else {
      // Display a custom lose message
      // You can customize this message as needed
      console.log('Game over! You lose!');
    }
  };

  // Use useEffect to watch timeLeft and end the game when it reaches zero
  useEffect(() => {
    if (timeLeft === 0) {
      endGame(false); // Game over when time expires
    }
  }, [timeLeft]);

  // Check for winning condition when the score reaches the winning score
  useEffect(() => {
    if (score >= 10) { // Hardcoded winning score (you can customize this as needed)
      endGame(true); // User wins when the score reaches the winning score
    }
  }, [score]);

  return (
    <div className="container">
      <h2 className="title">Game</h2>

      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        // Game content here
        <>
          <div
            className={`box ${boxColor}`}
            onClick={handleBoxClick}
          ></div>
          <p>Score: {score}</p>
          <p>Time Left: {timeLeft} seconds</p>
          {error && <p className="error">{error}</p>} {/* Display error if it exists */}
          {gameResult && (
            <p className={gameResult === 'win' ? 'win-message' : 'lose-message'}>
              {gameResult === 'win' ? 'You Win!' : 'Game Over!'}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
