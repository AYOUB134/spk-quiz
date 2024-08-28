import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { questionsRound1, questionsRound2, questionsRound3 } from './data';

const rounds = [questionsRound1, questionsRound2, questionsRound3];

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialRound = location.state?.round || 1;
    const [currentRound, setCurrentRound] = useState(initialRound);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(30);
    const [finished, setFinished] = useState(false);
    const [scores, setScores] = useState({ amna: 0, fatima: 0, maryam: 0 });
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [teamChanged, setTeamChanged] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    const questions = rounds[currentRound - 1] || [];

    useEffect(() => {
        if (questions.length === 0 || !timerStarted) return;

        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    clearInterval(countdown);
                    setTimeUp(true);
                    setTimeout(() => {
                        setTimeUp(false);
                        handleAnswer(null);
                    }, 4000);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [currentQuestionIndex, questions, timerStarted]);

    useEffect(() => {
        if (questions.length === 0) return;

        const newTeam = getTeamForQuestion(currentQuestionIndex);
        const previousTeam = getTeamForQuestion(currentQuestionIndex - 1);

        if (currentQuestionIndex > 0 && newTeam !== previousTeam) {
            setTeamChanged(true);
        }
    }, [currentQuestionIndex, questions]);

    const handleAnswer = (answer) => {
        if (questions.length === 0) return;

        const question = questions[currentQuestionIndex];
        const isCorrect = answer === question.answer;

        if (isCorrect) {
            let team = 'amna';
            if (currentQuestionIndex >= 10 && currentQuestionIndex < 20) {
                team = 'fatima';
            } else if (currentQuestionIndex >= 20) {
                team = 'maryam';
            }

            setScores(prev => ({ ...prev, [team]: prev[team] + 5 }));
        }

        setAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: answer }));
        setCorrectAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: question.answer }));
        setSelectedAnswer(answer);
        setAnswered(true);

        if (currentQuestionIndex + 1 < questions.length) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setTimer(getRoundTime(currentRound));
                setAnswered(false);
                setTimerStarted(false);
                setTeamChanged(false);
            }, 1000);
        } else {
            setFinished(true);
        }
    };

    const handleFinish = () => {
        if (currentRound === 3) {
            navigate('/results', { state: { scores } });
        } else {
            setCurrentRound(currentRound + 1);
            setCurrentQuestionIndex(0);
            setTimer(getRoundTime(currentRound + 1));
            setFinished(false);
            setSelectedAnswer(null);
            setAnswered(false);
            setTimerStarted(false);
        }
    };

    const getRoundTime = (round) => {
        switch (round) {
            case 1:
                return 30;
            case 2:
                return 60;
            case 3:
                return 15;
            default:
                return 30;
        }
    };

    const getTeamForQuestion = (index) => {
        if (index < 10) return 'Amna House';
        if (index < 20) return 'Fatima House';
        return 'Maryam House';
    };

    const closeTeamChangePopup = () => setTeamChanged(false);

    const startTimer = () => {
        setTimerStarted(true);
    };

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
                <h2 className="text-2xl font-bold mb-4">Round {currentRound} Completed!</h2>
                <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-xl text-center">
                    <h3 className="text-xl font-semibold mb-4">Scores</h3>
                    <p>Amna House: {scores.amna} Marks</p>
                    <p>Fatima House: {scores.fatima} Marks</p>
                    <p>Maryam House: {scores.maryam} Marks</p>
                    <button
                        onClick={handleFinish}
                        className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transform transition duration-300 hover:scale-105 mt-4"
                    >
                        {currentRound < 3 ? 'Next Round' : 'View Results'}
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestionIndex];

    return (
        <div className="flex items-center justify-between min-h-screen bg-gray-900 text-white p-8">
            <div className="flex flex-col items-center w-3/4">
                <h2 className="text-2xl font-bold mb-4">Round {currentRound}</h2>
                <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-xl text-center">
                    <h3 className="text-xl font-semibold mb-4">{question ? question.question : 'Loading...'}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {question?.options?.map((option) => {
                            const isCorrect = option === question.answer;
                            const isSelected = option === selectedAnswer;
                            let buttonClass = "text-gray-900 px-4 py-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105";

                            if (answered) {
                                if (isCorrect) {
                                    buttonClass += " bg-green-500";
                                } else if (isSelected) {
                                    buttonClass += " bg-red-500";
                                } else {
                                    buttonClass += " bg-yellow-500";
                                }
                            } else {
                                buttonClass += " bg-yellow-500";
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    className={buttonClass}
                                >
                                    {option}
                                </button>
                            );
                        }) || 'Loading options...'}
                    </div>
                    <div className="mt-4 text-xl font-bold bg-blue-700 text-white p-4 rounded-lg shadow-lg">
                        Team for this round: {getTeamForQuestion(currentQuestionIndex)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-1/4">
                <div
                    className={`text-8xl font-bold ${
                        timer <= 5 ? 'text-red-500' : 'text-white'
                    }`}
                >
                    {timer}s
                </div>
                {!timerStarted && (
                    <button
                        onClick={startTimer}
                        className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 mt-4"
                    >
                        Start Timer
                    </button>
                )}
            </div>

            {teamChanged && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4">Team Change</h3>
                        <p>The team for this round has changed to {getTeamForQuestion(currentQuestionIndex)}.</p>
                        <button
                            onClick={closeTeamChangePopup}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {timeUp && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4 text-red-600">Time Up!</h3>
                        <p>Moving to the next question...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
