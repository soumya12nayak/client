import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const [searchData, setSearchData] = useState({ title: "", location: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const onSearch = () => {
    setSearchFilter({
      title: searchData.title,
      location: searchData.location,
    });
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto px-6 sm:px-10 lg:px-24 my-12">
      {/* Sci-Fi Hero Panel */}
      <div className="relative min-h-[75vh] flex items-center justify-center bg-[#080d18] text-white rounded-xl shadow-lg overflow-hidden border border-[#00f2fe]/30">

        {/* Background - Galactic Feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#0a1f2c,#050c18)]"></div>

        {/* Subtle Starfield / Hex Grid */}
        <div className="absolute inset-0 opacity-10 bg-[url('/path-to-stars.png')]"></div>

        {/* Futuristic Circuit Borders */}
        <div className="absolute inset-0 border-2 border-[#00f2fe]/20 rounded-xl shadow-inner shadow-[#00f2fe]/10"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 md:px-8 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-[#c3eaff] uppercase">
            Your <span className="text-[#00f2fe]">Career Gateway</span> to the Future 🚀
          </h1>
          <p className="text-gray-400 text-base md:text-lg mt-5 max-w-lg md:max-w-xl mx-auto leading-relaxed">
            Next-gen job search, built for the new era. Precision, speed, and limitless opportunities.
          </p>

          {/* Futuristic Search Bar */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
            <input
              type="text"
              name="title"
              value={searchData.title}
              onChange={handleInputChange}
              placeholder="🔍 Job title or keyword"
              className="p-3 w-72 text-sm rounded-lg bg-[#1b2533]/80 border border-[#00f2fe]/40 text-[#c3eaff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f2fe] transition-all shadow-md shadow-[#00f2fe]/10"
            />
            <input
              type="text"
              name="location"
              value={searchData.location}
              onChange={handleInputChange}
              placeholder="📍 Location"
              className="p-3 w-72 text-sm rounded-lg bg-[#1b2533]/80 border border-[#00f2fe]/40 text-[#c3eaff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f2fe] transition-all shadow-md shadow-[#00f2fe]/10"
            />

            <button
              class="group relative px-8 py-3.5 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
              onClick={onSearch}
            >
              <span class="flex items-center gap-3 relative z-10">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="w-5 h-4 ml-2 transition-transform duration-300 group-hover:scale-125"
                >
                  <path
                    d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
                  ></path>
                </svg>

                Search
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-150"
                >
                  <path d="M12 2v20m0-20L4 12m8-10l8 10"></path>
                </svg>
              </span>
              <div
                class="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md"
              ></div>
              <div
                class="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl"
              ></div>
            </button>

          </div>

          {/* Sci-Fi Glowing Divider */}
          <div className="w-full h-[1px] mt-10 bg-gradient-to-r from-transparent via-[#00f2fe]/50 to-transparent"></div>
          {/* Title */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 uppercase tracking-wide mb-6 
                 relative after:block after:h-[2px] after:w-16 after:bg-cyan-400 after:mx-auto after:mt-2">
            Trusted by Global Companies
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              assets.accenture_logo,
              assets.walmart_logo,
              assets.adobe_logo,
              assets.samsung_logo,
              assets.amazon_logo,
              assets.microsoft_logo,
            ].map((logo, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center w-24 h-24 md:w-30 md:h-14
                 rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-lg 
                 border border-white/20 backdrop-blur-lg"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #16213e)", // Dark Sci-Fi Gradient
                  boxShadow: "0 4px 10px rgba(0, 221, 255, 0.3), inset 0 0 10px rgba(0, 221, 255, 0.2)",
                }}
              >
                {/* Background Blur Effect - Placed Behind */}
                <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-md -z-10"></div>

                {/* Logo Image - Always in Front */}
                <img
                  src={logo}
                  alt={`Company ${index}`}
                  className="h-12 md:h-14 object-contain mix-blend-normal relative"
                />
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  );
};

export default Hero;


