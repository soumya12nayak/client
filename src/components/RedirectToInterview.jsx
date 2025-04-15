import { useNavigate } from "react-router-dom";
import { FaRocket, FaCommentAlt, FaUserGraduate } from "react-icons/fa"; // Importing icons from react-icons

const RedirectToInterview = () => {
  const navigate = useNavigate();

  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
          🚀 Start Your AI Mock Interview
        </h2>

        {/* Info Section with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mb-8">
          <div className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaRocket className="text-5xl text-cyan-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mt-4">AI-Powered Interviews</h3>
            <p className="text-gray-200 mt-2">Get realistic interview questions powered by AI tailored to your role.</p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaCommentAlt className="text-5xl text-cyan-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mt-4">Real-time Feedback</h3>
            <p className="text-gray-200 mt-2">Receive instant feedback on your answers and improve your skills.</p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaUserGraduate className="text-5xl text-cyan-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mt-4">Track Your Progress</h3>
            <p className="text-gray-200 mt-2">Monitor your performance and see how you’ve improved over time.</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/interview-home")}
            className="bg-cyan-500 px-8 py-3 text-lg font-bold rounded-lg hover:bg-cyan-600 transition-all shadow-md hover:shadow-cyan-400/50"
          >
            Start Interview 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectToInterview;
