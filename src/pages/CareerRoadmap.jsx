import { useState } from "react";
import { generateRoadmap } from "../utils/generateRoadmap";

const CareerRoadmap = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title!");
      return;
    }

    setRoadmap("Generating roadmap...");
    setLoading(true);

    await generateRoadmap(jobTitle, (streamedText) => {
      setRoadmap(streamedText); // Update UI in real-time
    });

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="relative w-full max-w-3xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white/10 backdrop-blur-xl border border-white/20">
        
        {/* Sci-Fi Glow Effect */}
        {/* <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-20 animate-pulse"></div> */}

        <h1 className="text-3xl font-extrabold text-center text-cyan-400 mb-6">
          🚀 Career Roadmap Generator
        </h1>

        {/* Job Title Input */}
        <input
          type="text"
          placeholder="Enter your dream job (e.g., Software Engineer)"
          className="w-full p-3 rounded-lg text-white bg-transparent border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-400/50"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        {/* Roadmap Output */}
        <div className="mt-6 p-4 rounded-lg bg-white/10 border border-cyan-300 text-white whitespace-pre-line min-h-[150px]">
          {roadmap || "Your career roadmap will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
