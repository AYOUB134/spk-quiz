import React, { useState } from 'react';

function QuizComponent({ questions, onEndRound }) {
  const [roundScores, setRoundScores] = useState([0, 0, 0]); // 3 groups' scores
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (groupIndex, isCorrect) => {
    if (isCorrect) {
      const updatedScores = [...roundScores];
      updatedScores[groupIndex] += 1; // Increase score for the correct group
      setRoundScores(updatedScores);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onEndRound(roundScores);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
      <p className="mb-6">{questions[currentQuestionIndex].questionText}</p>
      <div className="grid grid-cols-3 gap-4">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.groupIndex, option.isCorrect)}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-700 transition"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizComponent;
