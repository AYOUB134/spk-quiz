import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/instructions');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <h1 className="text-white text-5xl md:text-7xl lg:text-9xl font-bold animate-pulse">
                Science Quiz
            </h1>
        </div>
    );
};

export default Welcome;
