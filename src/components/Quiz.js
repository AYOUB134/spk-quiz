import React, { useState, useEffect, useRef } from 'react';
import { quizData } from './quizData';
import Question from './Question';

function Quiz({ onCompletion }) {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [showGroupInput, setShowGroupInput] = useState(false);
  const [timer, setTimer] = useState(7);
  const intervalRef = useRef(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData[currentSubjectIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(7);
      setShowGroupInput(false);
      setAnswerStatus(null);
    } else if (currentSubjectIndex < quizData.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
      setTimer(7);
      setShowGroupInput(false);
      setAnswerStatus(null);
    } else {
      onCompletion(userAnswers);
    }
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === quizData[currentSubjectIndex].questions[currentQuestionIndex].correct;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setShowGroupInput(true);
    setUserAnswers([...userAnswers, { answer, correct: isCorrect, group: groupName }]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleGroupNameSubmit = () => {
    setShowGroupInput(false);
    handleNextQuestion();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ring-1 ring-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center animate-fadeIn">
          {quizData[currentSubjectIndex].subject}
        </h2>
        <Question data={quizData[currentSubjectIndex].questions[currentQuestionIndex]} onAnswer={handleAnswer} />
        <div className="text-right text-xl font-semibold text-gray-700 animate-fadeIn mb-6">
          Time left: <span className="font-bold text-red-500">{timer}</span> seconds
        </div>
        {answerStatus && (
          <div className={`mb-6 text-center text-xl font-semibold ${answerStatus === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {answerStatus === 'correct' ? '✅ Correct Answer!' : '❌ Wrong Answer!'}
          </div>
        )}
        {showGroupInput && (
          <div className="flex flex-col items-center space-y-4 animate-fadeIn mt-6">
            <input
              type="text"
              placeholder="Enter group name or number"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleGroupNameSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        )}
        {!showGroupInput && !answerStatus && (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
