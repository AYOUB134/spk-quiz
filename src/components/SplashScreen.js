
import React, { useEffect } from 'react';

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2 animate-slideIn opacity-0 transition-opacity duration-1000">
          <span className="text-blue-500">S</span>
          <span className="text-red-500">P</span>
          <span className="text-green-500"> </span>
          <span className="text-purple-500">Kango</span>
        </h1>
        <p className="text-lg text-gray-700 animate-slideOut opacity-0 transition-opacity duration-1000">Loading...</p>
      </div>
    </div>
  );
}

export default SplashScreen;
