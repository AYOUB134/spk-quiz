import React, { useState } from 'react';
import Question from './Question';

const rounds = [
  {
    title: "Round 1: General Knowledge",
    questions: [
      { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], correctAnswer: "Paris" },
      { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], correctAnswer: "Jupiter" },
      { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], correctAnswer: "Harper Lee" },
      { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correctAnswer: "Au" },
      { question: "Which element has the atomic number 1?", options: ["Hydrogen", "Helium", "Oxygen", "Carbon"], correctAnswer: "Hydrogen" }
    ]
  },
  {
    title: "Round 2: Spelling Bee",
    questions: [
      { question: "How do you spell the word for a large marine mammal?", options: ["Dolphin", "Dolfin", "Dolfhin", "Dolpheen"], correctAnswer: "Dolphin" },
      { question: "How do you spell the word for a type of tree that produces acorns?", options: ["Oak", "Oake", "Oack", "Oac"], correctAnswer: "Oak" },
      { question: "How do you spell the word for a small insect that can jump high?", options: ["Grasshoppe", "Grasshopper", "Grasshoppr", "Grasshoper"], correctAnswer: "Grasshopper" },
      { question: "How do you spell the word for a mythical creature with wings and a horn?", options: ["Unicorn", "Unicorne", "Unicor", "Uncorn"], correctAnswer: "Unicorn" },
      { question: "How do you spell the word for a device used to measure temperature?", options: ["Thermometer", "Thermomiter", "Thermometre", "Theromometer"], correctAnswer: "Thermometer" }
    ]
  },
  {
    title: "Round 3: Computer Science",
    questions: [
      { question: "What does CPU stand for?", options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"], correctAnswer: "Central Processing Unit" },
      { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hightext Markup Language", "Hypertext Markup Link", "Hyperlink Text Markup"], correctAnswer: "Hypertext Markup Language" },
      { question: "What is the main function of the operating system?", options: ["Manage hardware resources", "Run applications", "Provide internet access", "Store data"], correctAnswer: "Manage hardware resources" },
      { question: "Which programming language is known for its use in web development?", options: ["Python", "JavaScript", "C++", "Java"], correctAnswer: "JavaScript" },
      { question: "What is the term for a set of instructions that a computer follows?", options: ["Algorithm", "Program", "Function", "Script"], correctAnswer: "Program" }
    ]
  }
];

function MainQuizFlow() {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [roundResults, setRoundResults] = useState({
    round1: { group1: 0, group2: 0, group3: 0 },
    round2: { group1: 0, group2: 0, group3: 0 },
    round3: { group1: 0, group2: 0, group3: 0 }
  });

  const handleAnswer = (selectedOption) => {
    const currentRoundData = rounds[currentRound];
    const currentQuestionData = currentRoundData.questions[currentQuestion];

    // Check if the answer is correct
    const isCorrect = selectedOption === currentQuestionData.correctAnswer;
    
    // Show feedback in modal
    setUserAnswers([...userAnswers, { question: currentQuestionData.question, selectedOption, isCorrect, correctAnswer: currentQuestionData.correctAnswer }]);
    setModalOpen(true);
  };

  const handleGroupSelection = (group) => {
    const currentRoundData = rounds[currentRound];
    const currentQuestionData = currentRoundData.questions[currentQuestion];
    const isCorrect = userAnswers[userAnswers.length - 1].selectedOption === currentQuestionData.correctAnswer;

    // Save result for the selected group
    const roundKey = `round${currentRound + 1}`;
    const updatedRoundResults = { ...roundResults };
    updatedRoundResults[roundKey][`group${group}`] = (updatedRoundResults[roundKey][`group${group}`] || 0) + (isCorrect ? 1 : 0);
    setRoundResults(updatedRoundResults);

    // Close modal and move to next question or round
    setModalOpen(false);
    if (currentQuestion < currentRoundData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentRound < rounds.length - 1) {
      // Show round results
      setShowRoundResult(true);
    } else {
      // Final results
      setShowResult(true);
    }
  };

  const handleNextRound = () => {
    setShowRoundResult(false);
    setCurrentRound(currentRound + 1);
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  if (showResult) {
    const totalQuestions = rounds.flatMap(round => round.questions).length;
    const totalCorrect = Object.values(roundResults).flatMap(result => Object.values(result)).reduce((acc, cur) => acc + cur, 0);
    const percentage = (totalCorrect / totalQuestions) * 100;

    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Final Results!</h2>
        <p className="text-xl mb-4">Here are your results:</p>
        <ul className="space-y-2">
          {Object.keys(roundResults).map((roundKey, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2">{rounds[index].title} Results:</h3>
              {Object.keys(roundResults[roundKey]).map((group, i) => (
                <li key={i} className="p-4 rounded-lg bg-gray-100 mb-2">
                  <p className="font-semibold">{group}</p>
                  <p>Correct Answers: {roundResults[roundKey][group]}</p>
                </li>
              ))}
            </div>
          ))}
        </ul>
        <p className="text-xl mt-4">Overall Score: {percentage.toFixed(2)}%</p>
      </div>
    );
  }

  if (showRoundResult) {
    const roundKey = `round${currentRound + 1}`;
    const roundResult = roundResults[roundKey];
    const totalRoundQuestions = rounds[currentRound].questions.length;

    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">{rounds[currentRound].title} - Round Results</h2>
        <ul className="space-y-2">
          {Object.keys(roundResult).map((group, index) => (
            <li key={index} className="p-4 rounded-lg bg-gray-100">
              <p className="font-semibold">{group}</p>
              <p>Correct Answers: {roundResult[group]}</p>
            </li>
          ))}
        </ul>
        <p className="text-xl mt-4">Score: {((Object.values(roundResult).reduce((acc, cur) => acc + cur, 0) / totalRoundQuestions) * 100).toFixed(2)}%</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleNextRound}
        >
          Next Round
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-6">{rounds[currentRound].title}</h2>
      <Question
        data={rounds[currentRound].questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">Question Result:</p>
            {userAnswers.slice(-1).map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg ${answer.isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
                <p className="font-semibold">{answer.question}</p>
                <p className="mb-2">Your Answer: <span className={`${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>{answer.selectedOption}</span></p>
                <p className="font-semibold">Correct Answer: <span className="text-green-700">{answer.correctAnswer}</span></p>
                <div className="mt-4">
                  <p className="font-semibold">Which group answered this question?</p>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg mt-2" onClick={() => handleGroupSelection('1')}>Group 1</button>
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg mt-2" onClick={() => handleGroupSelection('2')}>Group 2</button>
                  <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg mt-2" onClick={() => handleGroupSelection('3')}>Group 3</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainQuizFlow;
