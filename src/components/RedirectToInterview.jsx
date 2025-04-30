import { useNavigate } from "react-router-dom";
import { FaRocket, FaCommentAlt, FaUserGraduate, FaLock } from "react-icons/fa"; // Import the FaLock icon
// Importing icons from react-icons
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const RedirectToInterview = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      toast.error("Please log in to start your interview");
      return;
    }
    navigate("/interview-home");
  };


  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
          🚀 Start Your AI Mock Interview
        </h2>

        {/* Info Section with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mb-8">
          {/* Card 1: AI-Powered Interviews */}
          <div className="p-6 bg-gradient-to-r from-gray-800 via-purple-900 to-black shadow-lg rounded-xl relative overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-teal-600 opacity-30 transform scale-95 group-hover:scale-100 transition-all duration-500"></div> */}
            <FaRocket className="text-5xl text-blue-400 mx-auto z-10" />
            <h3 className="text-2xl font-semibold text-white mt-4 z-10">AI-Powered Interviews</h3>
            <p className="text-gray-300 mt-2 z-10">Get realistic interview questions powered by AI tailored to your role.</p>
            <div className="absolute inset-0 border-2 border-blue-400 opacity-0 group-hover:opacity-50 transition-all duration-300 z-0"></div>
          </div>

          {/* Card 2: Real-time Feedback */}
          <div className="p-6 bg-gradient-to-r from-gray-900 via-indigo-900 to-black shadow-lg rounded-xl relative overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-yellow-600 opacity-30 transform scale-95 group-hover:scale-100 transition-all duration-500"></div> */}
            <FaCommentAlt className="text-5xl text-pink-400 mx-auto z-10" />
            <h3 className="text-2xl font-semibold text-white mt-4 z-10">Real-time Feedback</h3>
            <p className="text-gray-300 mt-2 z-10">Receive instant feedback on your answers and improve your skills.</p>
            <div className="absolute inset-0 border-2 border-pink-400 opacity-0 group-hover:opacity-50 transition-all duration-300 z-0"></div>
          </div>

          {/* Card 3: Track Your Progress */}
          <div className="p-6 bg-gradient-to-r from-gray-800 via-blue-900 to-black shadow-lg rounded-xl relative overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-indigo-700 opacity-30 transform scale-95 group-hover:scale-100 transition-all duration-500"></div> */}
            <FaUserGraduate className="text-5xl text-cyan-400 mx-auto z-10" />
            <h3 className="text-2xl font-semibold text-white mt-4 z-10">Track Your Progress</h3>
            <p className="text-gray-300 mt-2 z-10">Monitor your performance and see how you’ve improved over time.</p>
            <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-50 transition-all duration-300 z-0"></div>
          </div>
        </div>


        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStartClick}
            className="relative inline-flex items-center justify-center px-1 py-1 min-w-[140px] text-white text-lg font-medium rounded-lg bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-transform duration-300 hover:scale-95"
          >
            <span className="bg-[#05062d] rounded-md px-6 py-4 w-full h-full transition-all duration-300 group-hover:bg-transparent">
              {user ? (
                "Start Interview 🚀"
              ) : (
                <>
                  <FaLock className="inline-block mr-2 text-yellow-400" />
                  Please Log In
                </>
              )}
            </span>
          </button>


        </div>

      </div>
    </div>
  );
};

export default RedirectToInterview;
