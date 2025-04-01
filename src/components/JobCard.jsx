import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const JobCard = ({ job, isLocked }) => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsPremium(localStorage.getItem("isPremium") === "true");
  }, []);

  const handleClick = () => {
    if (isLocked && !isPremium) {
      navigate("/membership");// Show "Buy Premium" popup
    }
  };


  return (
    <div className="relative p-6 bg-gradient-to-br from-[#16202E] to-[#0A141F] rounded-xl shadow-lg transition-transform hover:scale-105 hover:shadow-2xl hover:border-[#00C9FF] border border-transparent duration-300" onClick={handleClick}>

     {/* Lock Overlay for Premium Jobs */}
     {isLocked && !isPremium && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white rounded-xl">
          <p className="text-lg font-bold">🔒 Premium Job</p>
          <button onClick={(e) => {
            e.stopPropagation(); // Prevents card click from triggering
            navigate("/membership"); // ✅ Directly redirect to membership page
            
          }}className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-white 
          font-bold px-6 py-3 rounded-lg shadow-lg overflow-hidden
          hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 
          before:absolute before:-inset-1 before:bg-gradient-to-r 
          before:from-yellow-300 before:to-yellow-500 before:opacity-20 
          before:blur-md before:rounded-lg 
          after:absolute after:left-[-150%] after:top-0 after:w-1/3 after:h-full 
          after:bg-white after:opacity-30 after:blur-md after:rotate-12 
          after:transition-all after:duration-700 hover:after:left-[150%]">
           ✨ Unlock Now ✨
          </button>
        </div>
      )}

      {/* Company Logo */}
      <div className="flex justify-between items-center mb-4">
        <img
          className="h-12 w-12 object-contain rounded-full border-2 border-[#00C9FF] shadow-md bg-white"
          src={job.companyId.image}
          alt="Company Logo"
          onError={(e) => e.target.src = "/fallback-logo.png"} // Optional: Fallback logo if image fails
        />
      </div>

      {/* Job Title & Company */}
      <h4 className="text-xl font-bold text-[#00C9FF] mb-2">{job.title}</h4>
      <p className="text-gray-400 text-sm mb-2 font-medium">{job.companyId.name}</p>

      {/* Job Details (Fixed badge wrapping issue) */}
      <div className="flex items-center gap-2 mt-2 text-sm">
        <span className="font-semibold bg-[#FFEDD5] border border-orange-400 px-3 py-1.5 rounded text-orange-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          📍 {job.location}
        </span>
        <span className="font-semibold bg-[#D1FAE5] border border-teal-400 px-3 py-1.5 rounded text-teal-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          🔥 {job.level}
        </span>
      </div>

      {/* Cleaned Job Description */}
      <p
        className="text-gray-300 text-sm mt-4 line-clamp-3"
        dangerouslySetInnerHTML={{
          __html: job.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "...",
        }}
      ></p>

      {/* Buttons Section */}
      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-[#00C9FF] text-[#0A141F] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#64FFDA] transition duration-300"
        >
          Apply Now 🚀
        </button>

        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-[#16202E] text-[#00C9FF] border border-[#00C9FF] px-4 py-2 rounded-lg font-semibold hover:bg-[#0A141F] hover:text-[#64FFDA] transition duration-300"
        >
          Learn More 🔍
        </button>
      </div>


          
      {/* Floating Glow */}
      <div className="absolute top-[-20px] left-[-20px] w-16 h-16 bg-[#00C9FF] opacity-10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-[-20px] right-[-20px] w-20 h-20 bg-[#64FFDA] opacity-10 blur-2xl rounded-full animate-pulse" />
      

    </div>
    

  );
};

export default JobCard;
