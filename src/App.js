import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import QuizInstructions from './components/QuizInstructions';
import MainQuizFlow from './components/MainQuizFlow'; // Updated to import MainQuizFlow
import Results from './components/Results';
import History from './components/History';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleQuizCompletion = (results) => {
    setCurrentScreen('results');
    const updatedHistory = [...history, results];
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {currentScreen === 'splash' && <SplashScreen onComplete={() => setCurrentScreen('instructions')} />}
      {currentScreen === 'instructions' && <QuizInstructions onComplete={() => setCurrentScreen('quiz')} />}
      {currentScreen === 'quiz' && <MainQuizFlow onCompletion={handleQuizCompletion} />} {/* Use MainQuizFlow */}
      {currentScreen === 'results' && <Results results={history[history.length - 1]} />}
      {currentScreen === 'history' && <History history={history} />}
    </div>
  );
}

export default App;
