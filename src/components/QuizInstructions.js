import React, { useEffect } from 'react';

// Define custom animation keyframes and styles
const styles = {
  fadeIn: {
    animation: 'fadeIn 1s ease-out forwards',
  },
  slideInFromLeft: {
    animation: 'slideInFromLeft 1s ease-out forwards',
  },
  slideInFromRight: {
    animation: 'slideInFromRight 1s ease-out forwards',
  },
  bounceIn: {
    animation: 'bounceIn 1s ease-out forwards',
  },
};

// Define custom keyframes for animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes bounceIn {
    from { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

function QuizInstructions({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 7000); // 7 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-300 via-purple-300 to-pink-300">
      <style>{customStyles}</style>
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto transform scale-95 transition-transform duration-500 ease-in-out hover:scale-100">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-8 text-center" style={styles.fadeIn}>
          Welcome to the Quiz!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center" style={styles.slideInFromLeft}>
          Please read the instructions carefully:
        </p>
        <ul className="list-disc list-inside space-y-4 mb-6 text-left" style={styles.slideInFromRight}>
          <li className="text-gray-600">
            <span className="font-semibold text-teal-600">Timer:</span> Each question has 30 seconds.
          </li>
          <li className="text-gray-600">
            <span className="font-semibold text-teal-600">Answering:</span> Click on your answer choice.
          </li>
          <li className="text-gray-600">
            <span className="font-semibold text-teal-600">Navigation:</span> Use the 'Next' button to move forward.
          </li>
          <li className="text-gray-600">
            <span className="font-semibold text-teal-600">Group Name:</span> Provide your group name after each question.
          </li>
          <li className="text-gray-600">
            <span className="font-semibold text-teal-600">Completion:</span> Review your answers and results at the end.
          </li>
        </ul>
        <p className="text-gray-500 text-sm text-center" style={styles.bounceIn}>
          The quiz will start shortly. Get ready!
        </p>
      </div>
    </div>
  );
}

export default QuizInstructions;
