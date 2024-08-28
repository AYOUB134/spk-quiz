import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
    const [currentRound, setCurrentRound] = useState(1);
    const navigate = useNavigate();

    const nextRound = () => {
        if (currentRound < 3) {
            setCurrentRound(currentRound + 1);
        } else {
            // Navigate to the quiz page for the first round
            navigate('/quiz', { state: { round: 1 } });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-11/12 md:w-3/4 lg:w-2/3 h-3/4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8 rounded-lg shadow-xl text-center flex flex-col items-center justify-between">
                <h2 className="text-4xl font-bold mb-8">Round {currentRound}</h2>
                <div className="text-xl mb-10 space-y-4">
                    {currentRound === 1 && (
                        <>
                            <p>Each team will be asked 10 questions.</p>
                            <p>Participants must answer within 30 seconds.</p>
                            <p>Each question carries 05 marks.</p>
                        </>
                    )}
                    {currentRound === 2 && (
                        <>
                            <p>Random Spellings.</p>
                            <p>Each team will be asked 10 spellings.</p>
                            <p>Team members must answer within a minute.</p>
                            <p>Each spelling is worth 05 marks.</p>
                        </>
                    )}
                    {currentRound === 3 && (
                        <>
                            <p>Each team will be asked 10 questions in a Rapid Fire session on Science Abbreviations, Constants, and Units.</p>
                            <p>Participants must answer within 15 seconds.</p>
                        </>
                    )}
                </div>
                <button
                    onClick={nextRound}
                    className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transform transition duration-300 hover:scale-105"
                >
                    {currentRound < 3 ? 'Next' : 'Start Quiz'}
                </button>
            </div>
        </div>
    );
};

export default Instructions;
