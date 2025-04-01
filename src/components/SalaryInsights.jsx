import { Bar } from "react-chartjs-2";
import { useEffect, useState } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryInsights = ({ salaryData }) => {
      const [isPremium, setIsPremium] = useState(false);
    
  useEffect(() => {
    setIsPremium(localStorage.getItem("isPremium") === "true");
  }, []);

  if (!isPremium) {
    return (
      <div className="mt-10 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700 text-center">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">💰 Salary Insights</h2>
        <p className="text-gray-300">Unlock salary trends with a premium membership.</p>
        <button
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded text-black font-semibold"
          onClick={() => alert("Redirecting to premium membership...")}
        >
          🔓 Unlock Now
        </button>
      </div>
    );
  }

  const chartData = {
    labels: salaryData.map((job) => job.title),
    datasets: [
      {
        label: "Salary (CTC in ₹)",
        data: salaryData.map((job) => job.salary),
        backgroundColor: "rgba(255, 206, 86, 0.7)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-10 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">💰 Salary Insights</h2>
      <p className="text-gray-300 mb-4">See salary trends for similar job roles.</p>
      <Bar data={chartData} />
    </div>
  );
};

export default SalaryInsights;
