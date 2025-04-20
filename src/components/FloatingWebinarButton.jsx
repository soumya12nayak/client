import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import { useUser } from "@clerk/clerk-react"; // Import useUser from Clerk

const FixedWebinarComponent = ({ isPremium }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser(); // Using the useUser hook to check if the user is signed in

  const handleClick = () => {
    if (!isSignedIn) {
      // Show a Toastify message to log in if not signed in
      toast.warning("Please log in to access this feature.", {
        position: "top-right",
        autoClose: 3000,
      });
      // Optionally, redirect to the login page
      
    } else if (isPremium) {
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
              isSignedIn
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {isSignedIn ? (isPremium ? "📅 View Webinars" : "🔒 Unlock Now") : "🔑 Log In to Access"}
          </button>

          {/* Tooltip for Non-Logged In Users */}
          {!isSignedIn && (
            <p className="mt-2 text-xs text-gray-400">
              Click to log in and unlock exclusive webinars.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FixedWebinarComponent;
