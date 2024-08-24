import React from 'react';

function QuizResult({ round, scores, onNextRound, isFinalRound }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6">Results after Round {round}</h2>
      <ul className="text-lg text-left list-disc list-inside mb-8">
        <li>Group 1: {scores[0]} points</li>
        <li>Group 2: {scores[1]} points</li>
        <li>Group 3: {scores[2]} points</li>
      </ul>
      <button
        onClick={onNextRound}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        {isFinalRound ? 'See Final Results' : 'Proceed to Next Round'}
      </button>
    </div>
  );
}

export default QuizResult;
