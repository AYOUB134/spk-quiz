import React from 'react';

function Question({ data, onAnswer }) {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg ring-1 ring-gray-200">
      <p className="text-xl font-semibold text-gray-900 mb-6">{data.question}</p>
      <div className="space-y-4">
        {data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
