import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { RocketLaunchIcon, CpuChipIcon, CommandLineIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AboutUs = () => {
    const features = [
        {
            icon: RocketLaunchIcon,
            title: "AI-Powered Career Pathways",
            desc: "AI creates personalized career roadmaps, predicting the best paths based on your skills and trends."
        },
        {
            icon: CpuChipIcon,
            title: "Neural Job Matching Engine",
            desc: "Advanced AI matches you with the best job opportunities based on your profile and market data."
        },
        {
            icon: CommandLineIcon,
            title: "Skill Assessment & Certification",
            desc: "Take AI-powered assessments to earn certifications that boost your profile."
        },
        {
            icon: GlobeAltIcon,
            title: "Global Job Network",
            desc: "Access job opportunities worldwide and expand your career reach."
        },
        {
            icon: SparklesIcon,
            title: "Real-Time Interview Prep",
            desc: "Prepare for interviews with AI-driven simulations and get instant feedback."
        }
    ];
    

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0c0c2f] to-[#0a0a0a] text-white px-6 py-16 font-sans relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-20" />
      
      {/* Glowing center orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            <span className="text-outline">Welcome to CareerGenie</span>
          </h2>
          <p className="text-stone-300 text-xl mb-12 max-w-3xl mx-auto">
          CareerGenie is an AI-powered platform designed to empower your career journey. We leverage advanced machine learning and neural networks to offer personalized job matching, skill assessments, and career growth insights. Our mission is to help you unlock new opportunities, enhance your skillset, and navigate your career path with data-driven precision and real-time feedback.
          </p>
        </motion.div>

        {/* Orbital Feature Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt options={{ max: 15, scale: 1.05 }}>
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 h-full">
                  <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2">{feature.title}</h3>
                  <p className="text-stone-300">{feature.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Interactive AI Career Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 mb-20 hover:border-purple-400/40 transition-all"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur opacity-30" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Personalized AI Career Advisor
          </h3>
          <p className="text-stone-300 text-lg leading-relaxed">
            Meet your AI-powered career coach! CareerGenie’s AI Career Advisor offers you real-time career guidance. Whether you need advice on job roles, industry trends, or skills development, our AI assistant is here to provide insights tailored specifically to your career needs. Simply ask, and let the future of career consulting guide you.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 mb-20 hover:border-purple-400/40 transition-all"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur opacity-30" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Our Mission: Empowering Future Generations
          </h3>
          <p className="text-stone-300 text-lg leading-relaxed">
            At CareerGenie, we believe in empowering individuals to achieve their career potential through innovative AI tools. Our systems are powered by cutting-edge technologies, offering personalized pathways and futuristic insights into the job market. We’re committed to not only helping you land your next role but enabling you to shape your career in the long term.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {['Innovation', 'Precision', 'Empowerment'].map((value, index) => (
            <motion.div
              key={value}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900/50 backdrop-blur-lg p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
            >
              <div className="text-cyan-400 text-4xl mb-4">0{index + 1}</div>
              <h4 className="text-2xl font-bold text-cyan-300 mb-2">{value}</h4>
              <p className="text-stone-300">
                {value === 'Innovation' ? 'Redefining the future of work with quantum-powered AI systems' : 
                value === 'Precision' ? 'Delivering unparalleled job matches with 99.7% accuracy' : 
                'Empowering individuals with AI-backed insights for career success'}
              </p>
            </motion.div>
          ))}
        </div>
        {/* Footer Section */}
<div className="text-center mt-24 py-6 text-sm text-stone-400">
  <p>CareerGenie 2025 &copy; All Rights Reserved</p>
</div>

      </div>
      
    </div>
  );
};

export default AboutUs;
