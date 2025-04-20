import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ClipboardCopy, Rocket, Zap, Calendar, User, MessageSquare, Send } from 'lucide-react';

const WebinarCard = ({ webinar }) => {
  const { user, isSignedIn } = useUser();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    message: '',
  });

  const handleApplyClick = () => {
    if (!isSignedIn) {
      alert('ACCESS DENIED: Authentication required to proceed');
      return;
    }
    setShowFormModal(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateFakePlatformLink = () => {
    const platforms = [
      "quantum-connect",
      "neural-network",
      "hologram-pro",
      "cyberspace-vr"
    ];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `https://${randomPlatform}.tech/join/${id}`;
  };

  const webinarLink = webinar.link || generateFakePlatformLink();

  const handleSubmit = () => {
    const webinarWithLink = {
      ...webinar,
      link: webinarLink,
    };

    const appliedWebinars = JSON.parse(localStorage.getItem("appliedWebinars") || "[]");
    localStorage.setItem(
      "appliedWebinars",
      JSON.stringify([...appliedWebinars, webinarWithLink])
    );

    setShowFormModal(false);
    setShowSuccessModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(webinarLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl border border-[#00C9FF]/20 bg-gradient-to-br from-[#0a192f] via-[#0f1b38] to-[#16202E] shadow-lg shadow-[#00C9FF]/10 hover:shadow-[#00C9FF]/20 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="w-5 h-5 text-[#00C9FF]" />
            <span className="text-xs font-mono text-[#00C9FF] tracking-wider">LIVE WEBINAR</span>
          </div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]">
            {webinar.title}
          </h3>
          <p className="mt-3 text-[#c4d4f0] leading-relaxed">
            {webinar.description || "Join us for an immersive exploration of cutting-edge technologies that are shaping our future. This session will provide deep insights into emerging trends and practical applications."}
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-white font-mono">SYNC DATE: {webinar.date || "TBD"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-white font-mono">DURATION: {webinar.duration || "90 MIN"}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-white font-mono">HOST: {webinar.speaker || "DR. ELON TURING"}</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleApplyClick}
        className="mt-6 w-full bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] hover:from-[#00a8e0] hover:to-[#7de38d] text-black font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#00C9FF]/30 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span>REQUEST ACCESS</span>
      </button>

      {/* Form Modal */}
{showFormModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-gradient-to-br from-[#0a192f] to-[#16202E] border border-[#00C9FF]/30 rounded-xl w-full max-w-md p-6 shadow-2xl shadow-[#00C9FF]/10">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] mb-2">
        ACCESS REQUEST: {webinar.title}
      </h2>
      <p className="text-[#c4d4f0] mb-6">Complete the form to secure your virtual seat</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-mono text-[#00C9FF] mb-1">IDENTIFICATION</label>
          <input
            type="text"
            name="name"
            value={user ? user.fullName : formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f1b38] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
            placeholder="FULL NAME"
            readOnly={isSignedIn} // Make field read-only if signed in
          />
          {isSignedIn && (
            <p className="text-xs text-[#00C9FF] mt-1">Verified by Clerk authentication</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-mono text-[#00C9FF] mb-1">CONTACT NODE</label>
          <input
            type="email"
            name="email"
            value={user ? user.primaryEmailAddress?.emailAddress : formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f1b38] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
            placeholder="EMAIL ADDRESS"
            readOnly={isSignedIn} // Make field read-only if signed in
          />
          {isSignedIn && (
            <p className="text-xs text-[#00C9FF] mt-1">Verified by Clerk authentication</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-mono text-[#00C9FF] mb-1">MESSAGE (OPTIONAL)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f1b38] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
            rows={4}
            placeholder="SPECIAL REQUESTS OR QUESTIONS"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowFormModal(false)}
          className="px-4 py-2 border border-[#00C9FF] text-[#00C9FF] rounded-lg hover:bg-[#00C9FF]/10 transition-colors"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-black font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          SUBMIT REQUEST
        </button>
      </div>
    </div>
  </div>
)}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0a192f] to-[#16202E] border border-[#00C9FF]/30 rounded-xl w-full max-w-md p-6 shadow-2xl shadow-[#00C9FF]/10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] mb-2">
                ACCESS GRANTED
              </h2>
              <p className="text-[#c4d4f0] mb-6">Your credentials have been verified. Welcome to the session.</p>
            </div>

            <div className="space-y-3 bg-[#0f1b38]/50 p-4 rounded-lg border border-[#00C9FF]/20">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#00C9FF] flex-shrink-0" />
                <div>
                  <p className="text-xs font-mono text-[#00C9FF]">SYNC DATE</p>
                  <p className="text-white">{webinar.date || "TBD"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#00C9FF] flex-shrink-0" />
                <div>
                  <p className="text-xs font-mono text-[#00C9FF]">VIRTUAL LOCATION</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white break-all">{webinarLink}</p>
                    <button onClick={handleCopyLink} className="text-[#00C9FF] hover:text-white transition-colors">
                      <ClipboardCopy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-[#92FE9D]">COPIED</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#00C9FF] flex-shrink-0" />
                <div>
                  <p className="text-xs font-mono text-[#00C9FF]">ADDITIONAL INFO</p>
                  <p className="text-white">Credentials will be transmitted to your contact node 24h prior to sync.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarCard;