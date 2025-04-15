import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const InterviewHome = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

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
                <button className="text-cyan-500 hover:text-cyan-600 font-medium">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InterviewHome;
