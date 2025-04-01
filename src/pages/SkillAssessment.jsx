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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />
  
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Page Heading */}
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">📝 Skill Assessment</h1>
        <p className="text-gray-300 text-lg mb-8 text-center max-w-2xl">
          Test your knowledge and earn a certificate for your skills. Choose a topic to get started.
        </p>
  
        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-cyan-300 mb-3">📌 How It Works</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Each quiz consists of <span className="text-cyan-400 font-semibold">10 questions</span>.</li>
            <li>You have a <span className="text-cyan-400 font-semibold">time limit</span> to complete each question.</li>
            <li>Earn a <span className="text-cyan-400 font-semibold">certificate</span> if you score above <span className="text-cyan-400 font-semibold">70%</span>.</li>
          </ul>
        </div>
  
        {/* Skills Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={() => navigate(`/quiz/${skill.name.toLowerCase()}`)}
              className="flex items-center justify-center gap-2 bg-gray-700 px-6 py-4 rounded-lg hover:bg-cyan-500 transition-all text-lg font-semibold shadow-lg"
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
