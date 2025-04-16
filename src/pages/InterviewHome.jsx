import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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
          <button
            onClick={handleStart}
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 transition duration-200"
          >
            Get Started
          </button>
        </div>

        {/* Previous Interviews Section */}
        <h2 className="text-2xl font-semibold mb-4">Previous Interviews</h2>

        <ul className="space-y-4">
          {interviews.map((int) => (
            <li key={int._id} className="bg-[#1f1f2e] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-medium">🧠 <b>{int.role}</b> ({int.experience})</p>
                  <p className="text-sm text-gray-400">📅 {new Date(int.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-cyan-400 text-lg">
                  <p>📊 <span className="font-semibold">{int.score}/100</span></p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-cyan-500 hover:text-cyan-600 font-medium"
                  onClick={() => fetchFullInterview(int._id)}
                >
                  View Details
                </button>

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
  );
};

export default InterviewHome;
