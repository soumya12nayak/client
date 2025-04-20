import { useNavigate } from "react-router-dom";

const SkillAssessmentSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className=" text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
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
              className="p-6 bg-[linear-gradient(135deg,_#0f0c29,_#302b63,_#24243e)] backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
            className="inline-flex items-center justify-center h-14 px-6 text-[#fefefe] text-[20px] font-mono bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] border-2 border-[#536DFE] rounded-lg shadow-[0_2px_4px_rgba(83,109,254,0.2),0_7px_13px_-3px_rgba(83,109,254,0.15),0_-3px_0_inset_#D6D6E7] transition duration-150 ease-in-out whitespace-nowrap hover:shadow-[0_4px_8px_rgba(83,109,254,0.3),0_7px_13px_-3px_rgba(83,109,254,0.2),0_-3px_0_inset_#D6D6E7] hover:-translate-y-0.5 active:shadow-[inset_0_3px_7px_#D6D6E7] active:translate-y-0.5 focus:outline-none focus:shadow-[0_0_0_1.5px_inset_#D6D6E7,0_2px_4px_rgba(83,109,254,0.4),0_7px_13px_-3px_rgba(83,109,254,0.3),0_-3px_0_inset_#D6D6E7]"
          >
            Start Assessment 🚀
          </button>

        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentSection;
