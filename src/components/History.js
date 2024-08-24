// History.js
import React from 'react';

function History({ history }) {
  const clearHistory = () => {
    localStorage.removeItem('quizHistory');
    window.location.reload();
  };

  return (
    <div>
      <h2>Quiz History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
}

export default History;
