import { useState } from "react";


const Webinars = () => {
  const webinars = [
    {
      title: "🚀 Career Growth in Tech",
      date: "April 5, 2025",
      speaker: "John Doe (CTO, TechCorp)",
      description: "Learn how to scale your career in the tech industry, from entry-level to senior roles.",
    },
    {
      title: "💡 Resume & Interview Masterclass",
      date: "April 10, 2025",
      speaker: "Sarah Smith (HR Lead, Google)",
      description: "Master the art of resume writing and interview techniques to land your dream job.",
    },
    {
      title: "🌎 Remote Work Success Strategies",
      date: "April 15, 2025",
      speaker: "Mike Johnson (CEO, RemoteWorks)",
      description: "Discover tips and tools to thrive in a remote work environment and increase productivity.",
    },
    {
      title: "📊 Salary Negotiation Secrets",
      date: "April 20, 2025",
      speaker: "Emma Wilson (Career Coach)",
      description: "Learn how to negotiate your salary and benefits like a pro.",
    },
    {
      title: "🛠️ Building a Strong LinkedIn Profile",
      date: "April 25, 2025",
      speaker: "David Lee (LinkedIn Expert)",
      description: "Optimize your LinkedIn profile to attract recruiters and grow your network.",
    },
  ];

  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(
    JSON.parse(localStorage.getItem("registeredWebinars")) || []
  );

  const handleRegister = (webinarTitle) => {
    setSelectedWebinar(webinarTitle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    const newRegistration = { name, email, webinar: selectedWebinar };
    const updatedRegistrations = [...registered, newRegistration];
    setRegistered(updatedRegistrations);
    localStorage.setItem("registeredWebinars", JSON.stringify(updatedRegistrations));

    alert(`🎉 You are registered for "${selectedWebinar}"!`);
    setSelectedWebinar(null);
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center text-cyan-400 mb-10 drop-shadow-md">
        🎤 Premium Webinars
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Join exclusive webinars hosted by industry experts. Upgrade your career with expert insights, practical tips, and live Q&A sessions.
      </p>

      {/* Webinars List */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {webinars.map((webinar, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-300/50 hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{webinar.title}</h2>
            <p className="text-gray-300 mb-1">📅 {webinar.date}</p>
            <p className="text-gray-400 mb-2">🎤 Speaker: {webinar.speaker}</p>
            <p className="text-gray-400 mb-4">{webinar.description}</p>
            <button
              onClick={() => handleRegister(webinar.title)}
              className="mt-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
            >
              Register Now
            </button>
          </div>
        ))}
      </div>

      {selectedWebinar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Register for {selectedWebinar}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
              />
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Confirm Registration
              </button>
            </form>
            <button
              onClick={() => setSelectedWebinar(null)}
              className="mt-3 text-gray-300 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16 p-6 bg-gray-800 rounded-lg shadow-lg border border-cyan-300/50">
        <h2 className="text-3xl font-semibold text-cyan-300 mb-6">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-medium">📍 How do I register?</h3>
            <p className="text-gray-300">Click the "Register Now" button below each webinar, and you'll receive a confirmation email.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-medium">💰 Are these webinars free?</h3>
            <p className="text-gray-300">These webinars are exclusive for premium members. Upgrade to unlock all sessions!</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-medium">📺 Can I watch the webinar later?</h3>
            <p className="text-gray-300">Yes! Premium members get access to webinar recordings for future reference.</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Webinars;
