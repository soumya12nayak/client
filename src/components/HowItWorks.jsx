const steps = [
  {
    title: "Create Your Profile",
    description: "Sign up and build a standout profile to attract top companies.",
    icon: "📝",
    tip: "Tip: Highlight your top 3 skills to stand out.",
  },
  {
    title: "Explore Jobs",
    description: "Browse personalized job recommendations based on your skills and preferences.",
    icon: "🔍",
    tip: "Tip: Set job alerts to never miss an opportunity.",
  },
  {
    title: "Apply in One Click",
    description: "Submit applications quickly and track your progress easily.",
    icon: "⚡",
    tip: "Tip: Customize your resume for each job.",
  },
  {
    title: "Get Hired",
    description: "Land your dream job and start your new career journey!",
    icon: "🎉",
    tip: "Tip: Follow up with recruiters to stay top of mind.",
  },
];

const HowItWorks = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <section className="py-12 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF] inline-block text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg">
            Your job search journey, made easy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-6 px-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center p-6 bg-gradient-to-br from-[#0a0f1c] to-[#141c2b] border border-cyan-500/20 rounded-xl w-full sm:w-64 shadow-[0_4px_20px_rgba(0,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/30 group"
            >
              {/* Icon with animation */}
              <div className="text-3xl sm:text-4xl mb-4 p-4 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#00c9ff] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]  ">
                {step.icon}
              </div>

              {/* Step Title with hover effect */}
              <h3 className="text-lg sm:text-xl font-bold text-cyan-400 group-hover:text-white mb-2 transition-all duration-300">
                {step.title}
              </h3>

              {/* Description with hover effect */}
              <p className="text-gray-300 text-sm sm:text-base text-center group-hover:text-gray-200 transition-all">
                {step.description}
              </p>

              {/* Bonus Tip with Glassmorphism effect */}
              <div className="mt-3 text-xs sm:text-sm text-[#00f0ff] italic bg-[#0f172a]/80 bg-opacity-50 px-3 py-2 rounded-md shadow-inner backdrop-blur-md">
                {step.tip}
              </div>

              {/* Connector Line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 right-[-10px] w-10 h-1 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF] shadow-md" />
              )}
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};


export default HowItWorks;
