import { useState, useEffect } from "react";

const RatingComponent = ({ companyId, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  // Load saved ratings from local storage
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("companyRatings")) || {};
    if (savedRatings[companyId]) setRating(savedRatings[companyId]);
  }, [companyId]);

  // Handle rating click
  const handleRating = (newRating) => {
    setRating(newRating);
    const updatedRatings = { ...(JSON.parse(localStorage.getItem("companyRatings")) || {}), [companyId]: newRating };
    localStorage.setItem("companyRatings", JSON.stringify(updatedRatings));
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= rating ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => handleRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
