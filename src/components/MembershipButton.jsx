import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./Modal";

const MembershipButton = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPremium(localStorage.getItem("isPremium") === "true");
  }, []);

  const handleRedirect = () => {
    navigate("/membership");
  };

  const handleCancelMembership = () => {
    setShowPopup(true);
  };

  const confirmCancel = () => {
    localStorage.removeItem("isPremium");
    setIsPremium(false);
    setShowPopup(false);
    setShowCancel(false); // ✅ Hide cancel button when membership is removed
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowCancel(false); // ✅ Hide cancel button when modal closes
  };

  return (
    <div
      className="flex justify-center items-center relative"
      onMouseEnter={() => setShowCancel(true)}
      onMouseLeave={() => setShowCancel(false)} // ✅ Ensures the cancel button disappears
    >
      {!isPremium ? (
        <button onClick={handleRedirect} className="premium">
          Buy Premium
        </button>
      ) : (
        <div className="relative">
          <button onClick={handleCancelMembership} className="crown">
            <svg className="logoIcon" height="1em" viewBox="0 0 576 512">
              <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"></path>
            </svg>
          </button>

          {showCancel && (
            <button
              onClick={handleCancelMembership}
              className="absolute left-1/2 top-[120%] transform -translate-x-1/2 bg-red-500 hover:bg-red-700 text-white text-sm px-4 py-2 rounded shadow-lg transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* ✅ Use Modal Component */}
      <Modal
        isOpen={showPopup}
        onClose={closePopup} // ✅ Close button now resets everything
        onConfirm={confirmCancel} // ✅ Cancel membership and hide cancel button
      />
    </div>
  );
};

export default MembershipButton;
