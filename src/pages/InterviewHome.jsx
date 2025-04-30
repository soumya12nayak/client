import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const InterviewHome = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/interviews/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch interviews");
        const data = await res.json();
        setInterviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.id) fetchData();
  }, [user]);

  const handleStart = () => {
    navigate("/interview", {
      state: { role, experience },
    });
  };

  const fetchFullInterview = async (interviewId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/interviews/interview/${interviewId}`);
      if (!res.ok) throw new Error("Failed to fetch full interview");
      const data = await res.json();
      setSelectedInterview(data); // this will update the modal content
      setShowModal(true);         // show the modal
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div><Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">AI Interview Prep</h1>

        {/* Role & Experience Inputs */}
        <div className="mb-8 space-y-6">
          <input
            className="w-full p-4 rounded-lg bg-[#1f1f2e] text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 transition duration-200"
            placeholder="Enter Role (e.g. Frontend Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-lg bg-[#1f1f2e] text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 transition duration-200"
            placeholder="Experience (e.g. 2 years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          {/* <div className="flex items-center justify-center h-screen"> */}
            <div className="relative group flex items-center justify-center">
              <button onClick={handleStart} className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="transition-all duration-500 group-hover:translate-x-1">Let's get started</span>
                    <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                    </svg>
                  </div>
                </span>
              </button>
            </div>
          {/* </div> */}
        </div>

        {/* Previous Interviews Section */}
        <h2 className="text-2xl font-semibold mb-4">Previous Interviews</h2>

        <ul className="space-y-4">
        {interviews.map((int) => (
  <li key={int._id} className="relative flex flex-col isolate w-250 h-32 bg-[#29292c] rounded-xl overflow-hidden font-sans text-sm hover:after:translate-x-1 transition-all duration-300 group">
    {/* Glow Layers */}
    <div className="absolute w-96 h-96 -top-1/2 -left-1/2 bg-[radial-gradient(circle_closest-side,white,transparent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
    <div className="absolute w-96 h-96 -top-1/2 -left-1/2 bg-[radial-gradient(circle_closest-side,white,transparent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0" />

    {/* Inner Card Border Layer */}
    <div className="absolute inset-[1px] rounded-[15px] bg-[#18181b] z-20"></div>

    {/* Left Glow Strip */}
    <div className="absolute left-2 top-3 bottom-3 w-1 rounded-sm bg-gradient-to-b from-[#2eadff] via-[#3d83ff] to-[#7e61ff] z-30 transition-transform duration-300 group-hover:translate-x-[0.15rem]" />

    {/* Main Card Content */}
    <div className="relative z-40 px-4 py-3 h-full flex flex-col justify-between">
      <div>
        <p className="text-[#32a6ff] font-semibold text-base">🧠 <b>{int.role}</b> ({int.experience})</p>
        <p className="text-gray-400 text-xs mt-1">📅 {new Date(int.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="text-cyan-400 text-sm font-semibold text-right">
        📊 {int.score}/100
      </div>
    </div>
  </li>
))}

        </ul>
      </div>

      {/* Interview Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1f1f2e] text-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedInterview(null)}
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-white"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Interview Details</h2>
            <p><strong>Role:</strong> {selectedInterview.role}</p>
            <p><strong>Experience:</strong> {selectedInterview.experience}</p>
            <p><strong>Date:</strong> {new Date(selectedInterview.createdAt).toLocaleString()}</p>
            <p><strong>Score:</strong> {selectedInterview.score}/100</p>

            <div className="mt-6 space-y-4">
              {selectedInterview.questions?.map((q, idx) => (
                <div key={idx} className="bg-[#2b2b3c] p-4 rounded-lg">
                  <p className="font-medium text-cyan-300">Q{idx + 1}: {q.question}</p>
                  <p className="text-sm mt-2"><span className="text-gray-400">Your Answer:</span> {q.answer}</p>
                  <p className="text-sm"><span className="text-gray-400">AI Feedback:</span> {q.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default InterviewHome;
