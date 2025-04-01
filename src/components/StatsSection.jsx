const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Companies Hiring" },
    { number: "10,000+", label: "Active Job Listings" },
    { number: "200K+", label: "Users Connected" },
    { number: "99%", label: "User Satisfaction Rate" },
  ];

  return (
    <div className="container 2xl:px-20 mx-auto my-20">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-md">
          🚀 Our Journey in Numbers
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-5xl font-bold text-white drop-shadow-md">{stat.number}</h3>
              <p className="text-gray-200 mt-2 text-lg font-medium">{stat.label}</p>
              <div className="mt-4 h-1 w-10 mx-auto bg-white/60 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
