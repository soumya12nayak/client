import { useNavigate } from "react-router-dom";

const SkillAssessmentSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
          🧠 Skill Assessment & Certification
        </h2>

        {/* Stats Grid (Maintaining Same Structure) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            { number: "10", label: "Questions per Quiz" },
            { number: "70%", label: "Minimum Passing Score" },
            { number: "∞", label: "Unlimited Attempts" },
            { number: "✔️", label: "Earn Certifications" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-5xl font-bold text-white drop-shadow-md">{item.number}</h3>
              <p className="text-gray-200 mt-2 text-lg font-medium">{item.label}</p>
              <div className="mt-4 h-1 w-10 mx-auto bg-white/60 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Button (Matching Style) */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/assessment")}
            className="bg-cyan-500 px-8 py-3 text-lg font-bold rounded-lg hover:bg-cyan-600 transition-all shadow-md hover:shadow-cyan-400/50"
          >
            Start Assessment 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentSection;
