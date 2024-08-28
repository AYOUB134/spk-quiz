import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { scores } = location.state || { scores: { amna: 0, fatima: 0, maryam: 0 } };
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Final Results</h2>
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-xl text-center">
                <h3 className="text-xl font-semibold mb-4">Scores</h3>
                <ul className="list-disc list-inside mb-4">
                    {sortedScores.map(([team, score]) => (
                        <li key={team} className="text-lg">{`${team.charAt(0).toUpperCase() + team.slice(1)}: ${score} Marks`}</li>
                    ))}
                </ul>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transform transition duration-300 hover:scale-105 mt-4"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Results;
