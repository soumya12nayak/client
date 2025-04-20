import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'

const Assessment = () => {
  const navigate = useNavigate();

  const skills = [
    { name: "JavaScript", icon: "📜" },
    { name: "React", icon: "⚛️" },
    { name: "Nodejs", icon: "🌱" },
    { name: "CSS", icon: "🎨" },
    { name: "Databases", icon: "🗄️" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "Cpp", icon: "💻" },
    { name: "Data_Structures", icon: "🛠️" },
    { name: "Algorithms", icon: "🔢" },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background Glow Effect (via CSS) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#1e0333] z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Page Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 tracking-tight mb-4 animate-pulse-slow shadow-cyan">
          📝 Skill Assessment
        </h1>
        <p className="text-gray-200 text-base sm:text-lg mb-8 text-center max-w-xl sm:max-w-2xl leading-relaxed">
          Test your knowledge and earn a certificate for your skills. Choose a topic to get started.
        </p>

        {/* Instructions */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-cyan-500/50 shadow-2xl mb-8 w-full max-w-xl backdrop-blur-sm hover:border-cyan-500 transition-all duration-300">
          <h2 className="text-xl font-semibold text-cyan-300 mb-3 tracking-wide">📌 How It Works</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>Each quiz consists of <span className="text-cyan-300 font-medium">10 questions</span>.</li>
            <li>You have a <span className="text-cyan-300 font-medium">time limit</span> to complete each question.</li>
            <li>Earn a <span className="text-cyan-300 font-medium">certificate</span> if you score above <span className="text-cyan-300 font-medium">70%</span>.</li>
          </ul>
        </div>

        {/* Skills Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 xl:gap-8">
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={() => navigate(`/quiz/${skill.name.toLowerCase()}`)}
              className="relative px-7 py-3 rounded-md border-2 border-[#030f14] text-[#56cde4] font-bold cursor-pointer select-none text-[18px] transition-all duration-300 group bg-[var(--color-back)] shadow-[inset_-1px_-1px_6px_rgba(54,69,75,1),inset_12px_0px_12px_-6px_rgba(3,15,20,0),inset_-12px_0px_12px_-6px_rgba(3,15,20,0),-1px_-1px_6px_rgba(54,69,75,1)] hover:shadow-[inset_0px_-6px_18px_-6px_rgba(3,15,20,1),inset_0px_6px_18px_-6px_rgba(3,15,20,1),inset_12px_0px_12px_-6px_rgba(3,15,20,0),inset_-12px_0px_12px_-6px_rgba(3,15,20,0),-1px_-1px_6px_rgba(54,69,75,1)] active:shadow-[inset_0px_-12px_12px_-6px_rgba(3,15,20,1),inset_0px_12px_12px_-6px_rgba(3,15,20,1),inset_12px_0px_12px_-6px_rgba(3,15,20,1),inset_-12px_0px_12px_-6px_rgba(3,15,20,1),-1px_-1px_6px_rgba(54,69,75,1)]"
            >
              <span className="text-2xl">{skill.icon}</span> {skill.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
