import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const AISummaryInput = () => {
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (summary.trim()) {
      navigate("/ai-generated-resume", { state: { summary } });
    }
  };

  return (
    <div>
    <Navbar />
    <div
  className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
>

      <h1 className="text-3xl font-bold mb-4">🚀 Enter Your Career Summary</h1>
      <textarea
        rows={6}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="E.g. I'm a frontend developer with 2 years of experience looking to grow into a senior role."
        className="w-full max-w-xl p-4 rounded-lg bg-gray-900 border border-gray-700 mb-6 resize-none"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105"
      >
        ✨ Generate AI Resume
      </button>
    </div>
    </div>
  );
};

export default AISummaryInput;
