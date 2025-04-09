// src/pages/ResumeChoice.jsx

import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const ResumeChoice = () => {
  const navigate = useNavigate();

  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-purple-500 w-full max-w-xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Create Your Resume</h1>
        <p className="text-gray-300">Choose your preferred method</p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.href = 'https://career-genie-resume-client.vercel.app'}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold transition-all shadow-lg hover:scale-105"
          >
            📝 Build Manually
          </button>

          <button
            onClick={() => navigate('/ai-summary')}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg font-semibold transition-all shadow-lg hover:scale-105"
          >
            🤖 Generate with AI
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResumeChoice;
