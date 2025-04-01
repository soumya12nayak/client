import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Import Clerk auth
import html2canvas from "html2canvas";
import { assets } from "../assets/assets";

const Certificate = () => {
  const { skill } = useParams();
  const { user } = useUser(); // Get user from Clerk
  const [userName, setUserName] = useState("Guest User");

  useEffect(() => {
    if (user) {
      setUserName(user.fullName || "CareerGenie User"); // Get user's full name
    }
  }, [user]);

  const handleDownload = () => {
    const certificateElement = document.getElementById("certificate");

    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${skill}_Certificate.png`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-6 text-center">
        🎉 Congratulations!
      </h1>
      <p className="text-lg text-gray-300 text-center">
        You have successfully passed the <span className="font-bold">{skill}</span> assessment.
      </p>

      {/* Certificate Design */}
      <div
        id="certificate"
        className="relative bg-white text-gray-900 rounded-lg shadow-2xl p-6 md:p-8 mt-6 w-full max-w-3xl border-4 border-yellow-500"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 opacity-10"></div>

        {/* CareerGenie Logo */}
        <img
          src={assets.logo}
          alt="CareerGenie Logo"
          className="w-20 md:w-32 mx-auto mb-4"
        />

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Certificate of Achievement
        </h2>
        <p className="text-lg text-gray-700 text-center mt-2">This is proudly awarded to</p>

        {/* User's Name */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-2">
          {userName}
        </h3>

        <p className="text-lg text-gray-700 text-center mt-2">
          For successfully completing the <span className="font-bold">{skill}</span> assessment with excellence.
        </p>

        {/* Trusted Companies */}
        <p className="text-gray-700 text-sm text-center mt-6">Trusted by top companies:</p>
        <div className="flex justify-center gap-3 md:gap-6 mt-3 flex-wrap">
          <img src={assets.microsoft_logo} alt="Microsoft" className="h-6 md:h-6" />
          <img src={assets.accenture_logo} alt="Accenture" className="h-6 md:h-6" />
          <img src={assets.amazon_logo} alt="Amazon" className="h-6 md:h-6" />
          <img src={assets.samsung_logo} alt="Samsung" className="h-6 md:h-6" />
          <img src={assets.walmart_logo} alt="Walmart" className="h-6 md:h-6" />
        </div>

        {/* Signature & Date */}
        <div className="flex flex-col md:flex-row justify-between mt-6 px-4 md:px-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-gray-900">CareerGenie</p>
            <p className="text-sm text-gray-600">Issued by</p>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="font-bold text-gray-900">{new Date().toDateString()}</p>
            <p className="text-sm text-gray-600">Date</p>
          </div>
        </div>

        {/* Golden Border Decoration */}
        <div className="absolute inset-0 border-8 border-yellow-400 rounded-lg opacity-50"></div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="bg-yellow-500 px-6 md:px-8 py-2 md:py-3 text-lg font-bold rounded-lg mt-6 hover:bg-yellow-600 transition-all shadow-lg"
      >
        📜 Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
