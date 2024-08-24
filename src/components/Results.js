import React from 'react';

function Results({ scores }) {
  const totalScore = scores[1] + scores[2] + scores[3];

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2 className="text-4xl font-bold mb-6">Quiz Results</h2>
      <div className="text-lg">
        <p>Round 1 (General Knowledge): {scores[1]} points</p>
        <p>Round 2 (Spelling Bee): {scores[2]} points</p>
        <p>Round 3 (Computer Science): {scores[3]} points</p>
        <hr className="my-4" />
        <p>Total Score: {totalScore} points</p>
      </div>
    </div>
  );
}

export default Results;
