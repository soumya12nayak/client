import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getMyWebinars } from "../api/webinarApi";
import WebinarCard from "../components/WebinarCard";
import { useNavigate } from "react-router-dom";
import { FaClipboard, FaTrash, FaPlus } from "react-icons/fa";

const Dashboardweb = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const [webinars, setWebinars] = useState([]);
  const [appliedWebinars, setAppliedWebinars] = useState([]);

  useEffect(() => {
    const fetchMyWebinars = async () => {
      try {
        const myWebinars = await getMyWebinars();
        setWebinars(myWebinars);
        localStorage.setItem("myWebinars", JSON.stringify(myWebinars));
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }
    };

    if (isSignedIn) {
      const cached = JSON.parse(localStorage.getItem("appliedWebinars")) || [];
      setAppliedWebinars(cached);
      fetchMyWebinars();
    }
  }, [isSignedIn]);

  const handleDelete = (id) => {
    const updated = webinars.filter((w) => w._id !== id);
    setWebinars(updated);
    localStorage.setItem("myWebinars", JSON.stringify(updated));
  };

  const handleCreate = () => {
    navigate("/create-webinar");
  };

  const generateWebinarLink = (webinar) => {
    const platforms = ["zoom", "google-meet", "teams", "webex"];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `https://${platform}.com/join/${id}`;
  };

  const handleCopyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#0f1b38] to-[#16202E]">
        <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-8 text-center max-w-md">
          <h2 className="text-xl font-medium text-white mb-4">
            Please sign in to access your dashboard
          </h2>
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-black font-medium px-6 py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f1b38] to-[#16202E]">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-[#00C9FF]/20">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]">
          My Dashboard
        </h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] hover:from-[#00a8e0] hover:to-[#7de38d] text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
        >
          <FaPlus />
          Create Webinar
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hosted Webinars Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Hosted Webinars</h2>
          </div>
          
          {webinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <div key={webinar._id} className="relative">
                  <WebinarCard webinar={webinar} />
                  <button
                    onClick={() => handleDelete(webinar._id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-8 text-center">
              <h3 className="text-lg font-medium text-white mb-2">
                No Webinars Hosted
              </h3>
              <p className="text-[#c4d4f0]">
                Create your first webinar to get started
              </p>
            </div>
          )}
        </div>

        {/* Registered Webinars Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Registered Webinars</h2>
          </div>
          
          {appliedWebinars.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {appliedWebinars.map((appliedWebinar) => {
      const webinar = webinars.find((w) => w._id === appliedWebinar._id);
      const webinarLink = webinar ? generateWebinarLink(webinar) : null;

      if (!webinar) return null;

      return (
        <div key={webinar._id} className="group relative bg-[#0f1b38] border border-[#00C9FF]/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[#00C9FF]/20 hover:border-[#00C9FF]/40">
          <div className="p-6">
            {/* Webinar Title with Gradient Text */}
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] mb-3">
              {webinar.title}
            </h3>
            
            {/* Description */}
            <p className="text-[#c4d4f0] text-sm mb-5 line-clamp-3">
              {webinar.description}
            </p>
            
            {/* Details Container */}
            <div className="space-y-3">
              {/* Date and Time */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#00C9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{webinar.date}</p>
                  <p className="text-xs text-[#c4d4f0]">{webinar.time || '6:00 PM UTC'}</p>
                </div>
              </div>

              {/* Host */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#00C9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Hosted by</p>
                  <p className="text-xs text-[#c4d4f0]">{webinar.speaker}</p>
                </div>
              </div>

              {/* Platform/Link */}
              {webinarLink && (
                <div className="pt-3 mt-3 border-t border-[#00C9FF]/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00C9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">Join via:</p>
                      <div className="flex items-center gap-1">
                        <a 
                          href={webinarLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline truncate"
                        >
                          {webinarLink}
                        </a>
                        <button
                          onClick={() => handleCopyToClipboard(webinarLink)}
                          className="text-[#00C9FF] hover:text-white transition-colors"
                          title="Copy link"
                        >
                          <FaClipboard className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hover effect border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00C9FF]/30 pointer-events-none transition-all duration-300 rounded-xl" />
        </div>
      );
    })}
  </div>
) : (
  <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-8 text-center">
    <h3 className="text-lg font-medium text-white mb-2">
      No Registered Webinars
    </h3>
    <p className="text-[#c4d4f0]">
      Apply to webinars to see them listed here
    </p>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Dashboardweb;