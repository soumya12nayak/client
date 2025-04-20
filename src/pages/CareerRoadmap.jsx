
import { useState } from "react";
import { generateRoadmap } from "../utils/generateRoadmap";

const CareerRoadmap = () => {
  const [dreamJob, setDreamJob] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleGenerate = async () => {
    setRoadmap('');
    setLoading(true);
    await generateRoadmap(dreamJob, (chunk) => {
      setRoadmap((prev) => prev + chunk);
    });
    setLoading(false);
  };

  

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-mono">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#1e0333] z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-900/20 p-6 sm:p-8 rounded-xl border border-cyan-500/50 backdrop-blur-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 tracking-tight mb-8 text-center animate-pulse-slow shadow-cyan">
          🚀 Career Roadmap Generator
        </h1>

        {/* Introductory Text */}
        <div className="mb-6 p-4 rounded-lg bg-gray-900/50 border border-cyan-500/50 text-gray-200 text-base sm:text-lg text-center max-w-2xl mx-auto backdrop-blur-sm">
          Generate a <span className="text-cyan-300 font-medium">personalized career roadmap</span> to your dream job! Enter your desired role, and our AI will outline the skills, steps, and milestones to get you there.
        </div>

        {/* Main Content and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Input and Output */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your dream job..."
              value={dreamJob}
              onChange={(e) => setDreamJob(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-900/50 text-cyan-200 border-2 border-cyan-500/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 focus:bg-gray-900/70 transition-all duration-300 shadow-cyan-sm placeholder:text-cyan-300/50"
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-cyan-500/80 border-2 border-cyan-400/70 text-cyan-100 font-semibold hover:bg-cyan-600 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-cyan-sm disabled:bg-gray-600/50 disabled:border-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Generating...' : 'Generate Roadmap'}
            </button>

            <div className="mt-8 p-6 rounded-xl bg-gray-900/50 border border-cyan-500/50 text-cyan-200 whitespace-pre-line shadow-2xl backdrop-blur-sm hover:border-cyan-500 transition-all duration-300">
              {roadmap || (loading && (
                <div className="flex items-center justify-center gap-2 text-cyan-200">
                  <div className="spinner"></div>
                  <span>Generating Roadmap...</span>
                </div>
              ))}
            </div>
          </div>

          
        </div>
        
      </div>
    </div>
  );
};

export default CareerRoadmap;
