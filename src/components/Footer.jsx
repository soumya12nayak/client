import { useState, useEffect } from "react";
import QuickLinksPopup from "./QuickLinksPopup";
import { assets } from "../assets/assets";

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate magical particles
    const particleArray = new Array(20).fill(0).map(() => ({
      id: Math.random(),
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 6 + 2 + "px",
      duration: Math.random() * 5 + 2 + "s",
    }));
    setParticles(particleArray);
  }, []);

  const handleOpenPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupContent("");
    setPopupTitle("");
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#0A0F29] to-[#1C1F40] text-white py-20 px-8 md:px-24 shadow-2xl">

      {/* Cosmic Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white rounded-full opacity-75 animate-sparkle"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.duration,
          }}
        ></div>
      ))}

      {/* Glowing Portals */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-xl animate-portal"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl animate-portal"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left relative z-10">

        {/* Logo & Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative inline-block p-3 rounded-full border-2 border-transparent hover:border-[#FFD700] transition-all duration-500 shadow-lg">
            <img
              width={190}
              src={assets.logo}
              alt="CareerGenie Logo"
              className="hover:scale-110 transition-transform duration-300 filter invert brightness-200"
            />
          </div>

          <p className="text-gray-300 mt-2 text-sm italic glitch-text">
            Unlock your future, one step at a time.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="font-semibold text-lg mb-2 text-white underline decoration-[#FFD700] decoration-2 glitch-text">
            Quick Links
          </h3>
          {[
            { title: "About Us", content: "CareerGenie helps job seekers find their dream jobs while enabling companies to discover top talent." },
            { title: "Contact", content: "Reach us at support@career-genie.com or call (123) 456-7890." },
            { title: "Careers", content: "Join our team! We're shaping the future of recruitment." },
            { title: "Privacy Policy", content: "Your data is safe with us. We value transparency and security." },
            { title: "Terms of Service", content: "Using CareerGenie means agreeing to our fair and trusted platform rules." },
          ].map((link, index) => (
            <button
              key={index}
              className="text-gray-300 hover:text-[#FFD700] transition duration-300 text-left hover:scale-105 transform hover:drop-shadow-glow glitch-text"
              onClick={() => handleOpenPopup(link.title, link.content)}
            >
              {link.title}
            </button>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2 text-white underline decoration-[#FFD700] decoration-2 glitch-text">
            Follow Us
          </h3>
          <div className="flex gap-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                className="w-10 h-10 animate-spinSlow hover:scale-110 transition-transform duration-300 drop-shadow-glow"
                src={assets.facebook_icon}
                alt="Facebook"
              />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                className="w-10 h-10 animate-spinSlow hover:scale-110 transition-transform duration-300 drop-shadow-glow"
                src={assets.twitter_icon}
                alt="Twitter"
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                className="w-10 h-10 animate-spinSlow hover:scale-110 transition-transform duration-300 drop-shadow-glow"
                src={assets.instagram_icon}
                alt="Instagram"
              />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            © {new Date().getFullYear()} CareerGenie | All rights reserved.
          </p>
        </div>
      </div>

      {/* Popup Component */}
      <QuickLinksPopup isOpen={isPopupOpen} onClose={handleClosePopup} content={popupContent} title={popupTitle} />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes sparkle {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes portal {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-sparkle {
          animation: sparkle infinite alternate ease-in-out;
        }

        .animate-portal {
          animation: portal 5s infinite alternate ease-in-out;
        }

        .animate-spinSlow {
          animation: spinSlow 10s linear infinite;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0px 0px 10px rgba(255, 215, 0, 0.8));
        }

        .glitch-text {
          text-shadow: 0px 0px 8px rgba(255, 215, 0, 0.8);
          animation: glitch 1.5s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
