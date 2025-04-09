import { useState } from "react";
import { generateRoadmap } from "../utils/generateRoadmap";

const CareerRoadmap = () => {
  const [dreamJob, setDreamJob] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setRoadmap('');
    setLoading(true);
    await generateRoadmap(dreamJob, (chunk) => {
      setRoadmap((prev) => prev + chunk);
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050A1F] to-[#0D1A3D] text-white font-mono px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-6 neon-text">🚀 Career Roadmap Generator</h1>

        <input
          type="text"
          placeholder="Enter your dream job..."
          value={dreamJob}
          onChange={(e) => setDreamJob(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-md bg-[#0F172A] text-white border border-cyan-500 focus:ring-2 focus:ring-cyan-400 transition duration-200"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3 rounded-md font-bold transition-all duration-200 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>

        <div className="mt-8 p-6 rounded-md bg-[#0F1B34] border border-cyan-600 whitespace-pre-line text-cyan-300 shadow-inner shadow-cyan-900/40">
          {roadmap || (loading && 'Loading...')}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;