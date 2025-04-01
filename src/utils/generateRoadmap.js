export async function generateRoadmap(jobTitle, onStreamUpdate) {
  const API_URL = "http://localhost:11434/api/generate"; // Ollama API
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `Create a **career roadmap** for a ${jobTitle}s.  
Follow this structured format:  

1. Introduction to the Role  
   - Key Responsibilities: (list key tasks).  
   - Importance of this job: (brief impact statement).  

2. Essential Skills  
   - Technical Skills: List of 5 core technical skills.  
   - Soft Skills: List of 3 crucial soft skills.  

3. Learning Path  
   - Beginner Level: Courses, books, and basic concepts.  
   - Intermediate Level: Hands-on projects, real-world applications.  

4. Experience & Projects  
   - Internships, industry projects, open-source contributions.  

5. Job Search & Career Growth  
   - Building a portfolio, job application strategies, career progression.

Use **bold headings** and **concise bullet points**. No introduction, just start!  
`,
        stream: true, // Enable streaming
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      // Decode the chunk and split into lines
      const chunk = decoder.decode(value, { stream: true }).trim();
      const lines = chunk.split("\n");

      // Process each line separately
      for (const line of lines) {
        try {
          const jsonData = JSON.parse(line); // Parse JSON
          if (jsonData.response) {
            result += jsonData.response; // Append text content
            onStreamUpdate(result); // Update UI in real-time
          }
        } catch (e) {
          console.error("Error parsing JSON chunk:", line);
        }
      }
    }

    return result.trim();
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return "Error generating roadmap. Make sure Ollama is running.";
  }
}
