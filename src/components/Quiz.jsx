
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import questionsData from "../data/questions";
import Navbar from '../components/Navbar'

const Quiz = () => {
  const { skill } = useParams();
  const navigate = useNavigate();

  // Get questions based on the selected skill
  const questions = questionsData[skill?.toLowerCase()] || [];

  // Check if no questions exist for the skill
  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#1e0333] z-[-1]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-red-400 tracking-tight shadow-red mb-4">❌ No Questions Found!</h1>
        <p className="text-gray-200 text-base sm:text-lg mt-4 text-center max-w-md">
          It looks like there are no questions available for "{skill}".
        </p>
        <button
          onClick={() => navigate("/assessment")}
          className="mt-6 px-6 py-3 rounded-lg bg-yellow-500/80 border-2 border-yellow-400/70 text-yellow-100 font-semibold hover:bg-yellow-600 hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-yellow-sm"
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
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#1e0333] z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyan-300 tracking-tight mb-6 animate-pulse-slow shadow-cyan">
          📝 {skill} Quiz
        </h1>
        {!showResult ? (
          <div className="bg-gray-900/50 p-6 rounded-xl border border-cyan-500/50 shadow-2xl w-full max-w-xl sm:max-w-2xl backdrop-blur-sm hover:border-cyan-500 transition-all duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-cyan-200 mb-4 tracking-wide">
              {questions[currentQuestion]?.question}
            </h2>
            <div className="flex flex-col gap-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 py-2 rounded-lg bg-gray-900/70 border-2 ${
                    selectedOption === option
                      ? "border-cyan-400 bg-cyan-500/50 text-cyan-100"
                      : "border-cyan-500/50 text-cyan-200 hover:bg-gray-900 hover:border-cyan-400"
                  } font-medium text-base sm:text-lg transition-all duration-300 shadow-cyan-sm`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="mt-4 px-6 py-3 rounded-lg bg-cyan-500/80 border-2 border-cyan-400/70 text-cyan-100 font-semibold hover:bg-cyan-600 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-cyan-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-cyan-500/50 shadow-2xl max-w-xl backdrop-blur-sm hover:border-cyan-500 transition-all duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 tracking-tight shadow-yellow mb-4">
              🎉 Quiz Completed!
            </h2>
            <p className="text-base sm:text-lg text-gray-200 mt-2">
              You scored {score} out of {questions.length}!
            </p>

            {/* Certificate Button */}
            {score >= 7 ? (
              <button
                onClick={() => navigate(`/certificate/${skill}`)}
                className="mt-4 px-6 py-3 rounded-lg bg-green-500/80 border-2 border-green-400/70 text-green-100 font-semibold hover:bg-green-600 hover:border-green-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-green-sm"
              >
                🎓 Get Your Certificate
              </button>
            ) : (
              <p className="mt-4 text-gray-200 text-base sm:text-lg">
                Score at least 70% to earn a certificate!
              </p>
            )}

            <button
              onClick={() => navigate("/assessment")}
              className="mt-4 px-6 py-3 rounded-lg bg-yellow-500/80 border-2 border-yellow-400/70 text-yellow-100 font-semibold hover:bg-yellow-600 hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-yellow-sm"
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
