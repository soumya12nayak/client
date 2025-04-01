import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyRating = ({ companyId, jobStatus, backendUrl }) => {
  const [rating, setRating] = useState(null);
  const { getToken } = useAuth();

  const submitRating = async (value) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/companies/rate`,
        { companyId, rating: value },
        { headers: { Authorization: `Bearer ${token}`} }
      );

      if (data.success) {
        toast.success("Rating submitted!");
        setRating(value);
      }
    } catch (error) {
      toast.error("Failed to submit rating");
    }
  };

  return (
    jobStatus !== "Pending" && (
      <div className="mt-2 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            onClick={() => submitRating(i + 1)}
            className={`cursor-pointer text-xl ${
              i < (rating || 0) ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    )
  );
};

export default CompanyRating;
