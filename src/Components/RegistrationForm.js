import React, { useState } from 'react';
import Game from './Game';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [error, setError] = useState(null); // State to hold error message

  const [gameStarted, setGameStarted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNumber || !difficultyLevel) {
      setError('Please fill in all fields.');
      return;
    }

    const user = {
      name,
      email,
      mobileNumber,
      difficultyLevel,
    };

    localStorage.setItem('user', JSON.stringify(user));
    setError(null); // Clear error if validation succeeds
    alert('Registration successful!');
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Difficulty Level:</label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        {error && <div className="error">{error}</div>} {/* Display error if it exists */}
        <button type="submit">Register</button>
      </form>

      {gameStarted ? (
        <Game />
      ) : (
        <button onClick={() => setGameStarted(true)}>Start Game</button>
      )}
    </div>
  );
}

export default RegistrationForm;
