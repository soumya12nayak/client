import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("🚀 Please fill all fields before launch!");
      return;
    }

    console.log("Form Data:", formData);
    toast.success("📡 Message transmitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f24] to-[#050c1c] text-white p-6">
      {/* Galactic Glow */}
      <div className="absolute w-96 h-96 bg-blue-500 opacity-30 blur-[120px] -top-20 -left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500 opacity-30 blur-[120px] bottom-10 right-10"></div>

      <div className="relative bg-[#111827] p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-blue-500/30">
        <h1 className="text-4xl font-extrabold text-blue-400 text-center">
          🌌 Contact Us
        </h1>
        <p className="text-gray-300 text-center mt-2">
          Need assistance? Connect with the career genie support team!
        </p>

        {/* Contact Info */}
        <div className="flex justify-center gap-8 mt-6 text-lg text-gray-300">
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-400" />
            <span>(+1) 123-456-7890</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-400" />
            <span>support@career-geniemail.com</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-400" />
            <span>Galaxy Sector 9, Andromeda</span>
          </div> */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="👽 Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1a2335] border border-blue-500 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1a2335] border border-blue-500 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 transition-all"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="💬 Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1a2335] border border-blue-500 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-black bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg transform hover:scale-105 transition-all"
          >
            🚀 Transmit Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
