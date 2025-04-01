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

        {/* Responsive Steps Layout */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-6 px-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center p-6 bg-[#1C2B3A] shadow-xl rounded-lg w-full sm:w-64 transition-transform hover:scale-105"
            >
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-3 bg-gradient-to-br from-[#64FFDA] to-[#00C9FF] p-3 rounded-full shadow-lg animate-pulse">
                {step.icon}
              </div>

              {/* Step Title & Description */}
              <h3 className="text-lg sm:text-xl font-semibold text-[#64FFDA] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base text-center">
                {step.description}
              </p>

              {/* Bonus Tip */}
              <div className="mt-2 text-xs sm:text-sm text-[#00C9FF] italic bg-[#0F172A] p-1 rounded-md shadow-inner">
                {step.tip}
              </div>

              {/* Connector Line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 right-[-10px] w-10 h-1 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF]" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


export default HowItWorks;
