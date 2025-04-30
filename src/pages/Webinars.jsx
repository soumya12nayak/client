import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import WebinarCard from "../components/WebinarCard";
import { getWebinars } from "../api/webinarApi";
import { Rocket, Calendar, Users, Video, HelpCircle } from "lucide-react";

const Webinars = () => {
  const { user, isSignedIn } = useUser();
  const [webinars, setWebinars] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getWebinars()
      .then((data) => setWebinars(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f1b38] to-[#16202E] flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b border-[#00C9FF]/20">
        <div onClick={() => navigate("/")} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] cursor-pointer">
          CareerGenie WebinarHub
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-[#c4d4f0]">Welcome back, {user.firstName}</span>
            <button
              onClick={() => navigate("/dashboard-web")}
              className="bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] hover:from-[#00a8e0] hover:to-[#7de38d] text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
            >
              Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] hover:from-[#00a8e0] hover:to-[#7de38d] text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Upcoming Webinars</h1>
          {isSignedIn && (
            <button
              onClick={() => navigate("/dashboard-web")}
              className="flex items-center gap-2 bg-[#0f1b38] hover:bg-[#00C9FF]/10 border border-[#00C9FF]/30 text-[#00C9FF] px-4 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              My Webinars
            </button>
          )}
        </div>

        {webinars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <WebinarCard key={webinar._id} webinar={webinar} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-8 text-center">
            <div className="text-[#00C9FF] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No Webinars Scheduled</h3>
            <p className="text-[#c4d4f0]">Check back later for upcoming events</p>
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Rocket className="w-8 h-8 text-[#00C9FF]" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Discover Webinars</h3>
              <p className="text-[#c4d4f0]">Browse our curated selection of career-focused webinars from industry experts</p>
            </div>
            
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="w-8 h-8 text-[#00C9FF]" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Register Easily</h3>
              <p className="text-[#c4d4f0]">Sign up with one click and get instant access to your selected webinars</p>
            </div>
            
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Video className="w-8 h-8 text-[#00C9FF]" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Join & Learn</h3>
              <p className="text-[#c4d4f0]">Attend live sessions or watch recordings to boost your career growth</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What Participants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-6">
              <p className="text-[#c4d4f0] italic mb-4">"The webinars helped me land my dream job in tech. The insights from industry leaders were invaluable."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#00C9FF]/20 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-[#00C9FF]" />
                </div>
                <div>
                  <p className="text-white font-medium">Alex Johnson</p>
                  <p className="text-[#c4d4f0] text-sm">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0f1b38]/50 border border-[#00C9FF]/20 rounded-xl p-6">
              <p className="text-[#c4d4f0] italic mb-4">"I've attended three webinars so far and each one has given me practical skills I use daily in my marketing role."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#00C9FF]/20 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-[#00C9FF]" />
                </div>
                <div>
                  <p className="text-white font-medium">Sarah Miller</p>
                  <p className="text-[#c4d4f0] text-sm">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a192f] border-t border-[#00C9FF]/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]">
                CareerGenie WebinarHub
              </h3>
              <p className="text-[#c4d4f0] mt-2">Empowering your career growth through expert knowledge</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="/about" className="text-[#c4d4f0] hover:text-[#00C9FF] transition-colors">About</a>
                <a href="/contact" className="text-[#c4d4f0] hover:text-[#00C9FF] transition-colors">Contact</a>
                <a href="#" className="text-[#c4d4f0] hover:text-[#00C9FF] transition-colors">FAQ</a>
                <a href="#" className="text-[#c4d4f0] hover:text-[#00C9FF] transition-colors">Privacy</a>
              </div>
              <p className="text-[#c4d4f0] text-sm">© {new Date().getFullYear()} CareerGenie. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Webinars;