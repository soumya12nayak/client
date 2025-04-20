import { useNavigate } from "react-router-dom";

const CareerRoadmapSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
          🧭 AI Career Roadmap Generator
        </h2>

        {/* Stats/Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {[
            { number: "📚", label: "Step-by-Step Roadmap" },
            { number: "🎯", label: "AI-Powered Guidance" },
            { number: "📈", label: "Trackable Progress" },
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

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/roadmap")}
            className="mx-auto block w-[210px] h-[51px] rounded-[15px] cursor-pointer transition ease-in-out bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] hover:bg-[#2e8effb3] hover:shadow-md hover:shadow-[#2e8eff80] focus:bg-[#2e8effb3] focus:shadow-md focus:shadow-[#2e8eff80] outline-none"
          >
            <div className="w-[210px] h-[47px] rounded-[13px] bg-[#1a1a1a] text-white font-semibold flex items-center justify-center gap-[10px]">
              <span>Generate My Roadmap 🚀</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default CareerRoadmapSection;
