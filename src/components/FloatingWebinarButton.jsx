import { useNavigate } from "react-router-dom";

const FixedWebinarComponent = ({ isPremium }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isPremium) {
      navigate("/webinars"); // Direct to Webinars if Premium
    } else {
      navigate("/membership"); // Direct to Membership Page if Not Premium
    }
  };

  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <section className="py-12 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF] inline-block text-transparent bg-clip-text">
            🎓 Exclusive Career Webinars
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg">
            Premium-only career growth sessions with industry experts.
          </p>

          {/* Webinar Button */}
          <button
            onClick={handleClick}
            className={`mt-6 px-6 py-3 font-semibold text-lg rounded-full shadow-lg transition-transform ${
              isPremium
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {isPremium ? "📅 View Webinars" : "🔒 Unlock Now"}
          </button>

          {/* Tooltip for Non-Premium Users */}
          {!isPremium && (
            <p className="mt-2 text-xs text-gray-400">
              Click to unlock with Premium Membership.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FixedWebinarComponent;
