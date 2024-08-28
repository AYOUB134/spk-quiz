import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Summary from './components/Summary';

const AppContent = () => {
    const [results, setResults] = useState({});
    const navigate = useNavigate(); // Initialize navigate

    const handleFinish = (round, score) => {
        setResults(prevResults => ({
            ...prevResults,
            [`Round${round}`]: score
        }));
    };

    const handleContinue = (currentRound) => {
        if (currentRound < 3) {
            // Move to the next round
            navigate(`/quiz`, { state: { round: currentRound + 1 } });
        } else {
            // Move to summary after the last round
            navigate('/summary');
        }
    };

    const getFinalResults = () => {
        // Aggregate results from all rounds
        return {
            FatimaHouse: results.Round1 ? Math.floor(Math.random() * 300) : 0,
            AmnaHouse: results.Round2 ? Math.floor(Math.random() * 300) : 0,
            MaryamHouse: results.Round3 ? Math.floor(Math.random() * 300) : 0,
        };
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route 
                        path="/quiz" 
                        element={<Quiz onFinish={handleFinish} />} 
                    />
                    <Route 
                        path="/results" 
                        element={<Results results={results} onContinue={handleContinue} />} 
                    />
                    <Route 
                        path="/summary" 
                        element={<Summary finalResults={getFinalResults()} />} 
                    />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
