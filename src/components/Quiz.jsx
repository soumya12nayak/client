import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import questionsData from "../data/questions";
import Navbar from '../components/Navbar'
 // Ensure path is correct

const Quiz = () => {
  const { skill } = useParams();
  const navigate = useNavigate();

  // Get questions based on the selected skill
  const questions = questionsData[skill?.toLowerCase()] || [];

  // Check if no questions exist for the skill
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-3xl font-bold text-red-500">❌ No Questions Found!</h1>
        <p className="mt-4">It looks like there are no questions available for "{skill}".</p>
        <button
          onClick={() => navigate("/assessment")}
          className="mt-4 px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />
  
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">📝 {skill} Quiz</h1>
        {!showResult ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion]?.question}</h2>
            <div className="flex flex-col gap-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedOption === option ? "bg-cyan-500" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="mt-4 px-6 py-3 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-all"
            >
              {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-400">🎉 Quiz Completed!</h2>
            <p className="text-lg mt-2">You scored {score} out of {questions.length}!</p>
  
            {/* ✅ Show Certificate Button if Score is 70% or More */}
            {score >= 7 ? (
              <button
                onClick={() => navigate(`/certificate/${skill}`)}
                className="mt-4 px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-all"
              >
                🎓 Get Your Certificate
              </button>
            ) : (
              <p className="mt-4 text-gray-300">Score at least 70% to earn a certificate!</p>
            )}
  
            <button
              onClick={() => navigate("/assessment")}
              className="mt-4 px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all"
            >
              Try Another Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Quiz;
