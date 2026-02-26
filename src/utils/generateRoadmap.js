export const generateRoadmap = async (dreamJob, onStreamUpdate) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/ai/roadmap`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dreamJob }),
      }
    );

    if (!response.ok) {
      throw new Error("Backend roadmap request failed");
    }

    const data = await response.json();

    // Send full response to UI
    onStreamUpdate(data.reply);

  } catch (err) {
    console.error("Roadmap error:", err);
    throw new Error("Failed to connect to AI service.");
  }
};
