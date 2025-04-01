// src/components/InterviewBadge.jsx
const InterviewBadge = ({ job }) => {
    
    if (!job.status?.toLowerCase().includes("accepted")) return null;

    // Generate a random future date and time for the interview
  const getRandomDateTime = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // Set a date within the next 30 days

    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );

    const formattedDate = randomDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const formattedTime = randomDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  // Each job gets its own unique interview time
  const interviewDateTime = getRandomDateTime();
  
    return (
      <div className="mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center gap-2 animate-pulse">
        📅 <strong>Interview Scheduled:</strong> {interviewDateTime}
        <a
          href="https://meet.google.com/interview-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline ml-2 hover:text-blue-700"
        >
          Join
        </a>
      </div>
    );
  };
  
  export default InterviewBadge;
  