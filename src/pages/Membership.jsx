import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "https://career-genie-server.vercel.app/api/payment/create-order",
        { amount: 49900, currency: "INR" }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Job Portal Premium",
        description: "Unlock premium job features!",
        order_id: data.order.id,
        handler: (response) => {
          alert("🎉 Payment Successful!");
          localStorage.setItem("isPremium", "true");
          navigate("/");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#FFD700" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 relative overflow-hidden">
      {/* Sci-Fi Golden Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 z-0" />
      <div className="absolute -top-10 left-1/3 w-[500px] h-[500px] bg-yellow-500 opacity-30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-amber-500 opacity-30 blur-[120px] rounded-full" />

      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow-lg mb-4">
        👑 Unlock Gold Membership
      </h1>
      <p className="text-gray-300 text-lg mb-8">
        Elevate your job search with premium tools & golden perks!
      </p>

      {/* Perks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
        {[
          { emoji: "💼", text: "Direct recruiter contact" },
          { emoji: "📄", text: "Resume generator" },
          { emoji: "🎤", text: "Exclusive webinars & salary insights" },
          { emoji: "🚀", text: "Access to premium job listings" },
        ].map((perk, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-5 rounded-lg border border-yellow-500/50 backdrop-blur-md bg-white/5 shadow-md hover:scale-105 transition-all duration-300"
          >
            <span className="text-3xl">{perk.emoji}</span>
            <p className="font-medium text-lg">{perk.text}</p>
          </div>
        ))}
      </div>

      {/* Glowing Golden Button */}
      <button
        onClick={handlePayment}
        className="golden-button relative mt-8 px-10 py-4 text-lg font-bold text-black rounded-full border border-yellow-400 shadow-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 ease-in-out before:absolute before:-inset-1 before:rounded-full before:bg-yellow-300 before:blur-md before:opacity-40 hover:before:opacity-60"
      >
        ✨ Go Premium — ₹499
      </button>

      {/* Golden Energy Streaks */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-pulse top-10 left-20"></div>
        <div className="absolute w-3 h-3 bg-amber-300 rounded-full opacity-50 animate-pulse top-20 right-40"></div>
        <div className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-30 animate-pulse bottom-20 left-1/3"></div>
      </div>
    </div>

  );
};

export default Membership;
