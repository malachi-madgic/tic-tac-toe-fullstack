import React, { useState, useEffect } from 'react';
import './App.css';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

function App() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
  });

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/game');
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const handleSquareClick = async (index) => {
    if (gameState.winner || gameState.isDraw || gameState.board[index]) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reset', {
        method: 'POST',
      });
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const getStatus = () => {
    if (gameState.winner) {
      return `Winner: ${gameState.winner}`;
    }
    if (gameState.isDraw) {
      return 'Draw!';
    }
    return `Next player: ${gameState.currentPlayer}`;
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={gameState.board} onClick={handleSquareClick} />
      </div>
      <div className="game-info">
        <div>{getStatus()}</div>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}

export default App;
