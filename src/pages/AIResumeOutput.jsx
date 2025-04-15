import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ResumeTemplate from "../components/ResumeTemplate";
import html2pdf from "html2pdf.js";
import Navbar from "../components/Navbar";


const AIResumeOutput = () => {
  const location = useLocation();
  const userSummary = location.state?.summary;
  const [resume, setResume] = useState(null);
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const element = resumeRef.current;

    const opt = {
      margin: 0.5,
      filename: `${resume?.personal_info?.name || "resume"}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] }
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    if (userSummary) {
      console.log("✅ Summary received from state:", userSummary);
      generateResume();
    }
  }, [userSummary]);

  const generateResume = async () => {
    const controller = new AbortController();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          stream: true,
          messages: [
            {
              role: "system",
              content: `
You are an AI resume builder. Based on the user's summary, generate a detailed and structured resume in **valid JSON only** (no markdown, no explanation).

Always include and populate the following fields using realistic and relevant information derived from the user's input:

{
  "name": "Full Name",
  "title": "Job Title",
  "summary": "Brief professional summary",
  "contact": {
    "email": "user@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/username"
  },
  "skills": ["Skill 1", "Skill 2", "..."],
  "experience": [
    {
      "title": "Role Title",
      "company": "Company Name",
      "dates": "Start - End",
      "description": "Work responsibilities and achievements"
    }
  ],
  "education": {
    "degree": "Degree",
    "field": "Field of Study",
    "institution": "College/University Name",
    "graduationYear": "Year"
  },
  "certificates": [
    {
      "name": "Certificate Name",
      "issuer": "Certificate Issuer (inferred)",
      "year": "Year (inferred)"
    }
  ],
  "languages": [
  { "language": "English", "level": "Fluent" },
  { "language": "Hindi", "level": "Native" }
]
  "projects": [
  {
    "name": "Project Name",
    "description": "Project description with outcomes and features.",
    "tech_stack": "React, Node.js, MongoDB",
    "link": "https://github.com/user/project"
  }
]

}

Return only the JSON. Use the summary below as the base input for generation.

`,
            },
            {
              role: "user",
              content: `Summary: ${userSummary}`,
            },
          ],
        }),
        signal: controller.signal,
      });

      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonLine = line.replace("data: ", "").trim();
            if (jsonLine === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonLine);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                const cleanDelta = delta.replace(/^\s*json\s*/i, "");
                fullText += cleanDelta;
                console.log("📥 Streamed chunk:", cleanDelta);
              }
            } catch (err) {
              console.warn("⚠️ JSON chunk parse error:", err, jsonLine);
            }
          }
        }
      }

      console.log("✅ Final raw streamed text:", fullText);

      try {
        const cleaned = fullText
          .trim()
          .replace(/^```json\s*|```$/g, "")
          .replace(/^```|```$/g, "")
          .replace(/^"+|"+$/g, "");

        const resumeObj = JSON.parse(cleaned);
        console.log("👀 Resume object:", resumeObj);

        const normalizedResume = {
          personal_info: {
            name: resumeObj.name || "",
            email: resumeObj.contact?.email || "",
            phone: resumeObj.contact?.phone || "",
            linkedin: resumeObj.contact?.linkedin || "",
          },
          title: resumeObj.title || "",
          summary: resumeObj.summary || resumeObj.specialization || resumeObj.passion || "",
          skills: Array.isArray(resumeObj.skills) ? resumeObj.skills : [],
          experience: Array.isArray(resumeObj.experience) ? resumeObj.experience : [],
          education: resumeObj.education?.degree
            ? [
              {
                degree: resumeObj.education.degree || "",
                major: resumeObj.education.field || "",
                institution: resumeObj.education.institution || "",
                graduation_year: resumeObj.education.graduationYear || "",
              },
            ]
            : [],
          certificates: Array.isArray(resumeObj.certificates) ? resumeObj.certificates : [],
          languages: Array.isArray(resumeObj.languages) ? resumeObj.languages : [],
          projects: Array.isArray(resumeObj.projects) ? resumeObj.projects : [],

        };

        console.log("✅ Normalized resume:", normalizedResume);
        setResume(normalizedResume);
      } catch (error) {
        console.error("❌ Final JSON parse error:", error);
      }
    } catch (error) {
      console.error("❌ Streaming error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen text-white flex flex-col justify-center items-center p-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531707566548-6577aab321d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability and sci-fi glow */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 w-full max-w-5xl">
          <h1 className="text-4xl font-bold text-center mb-10 text-cyan-400 tracking-wide shadow-lg drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            🛸 Your AI-Generated Resume
          </h1>

          {resume ? (
            <>
              <div className="bg-[#0f172a]/80 p-8 rounded-xl shadow-xl border border-cyan-400/30 backdrop-blur-xl">
                <ResumeTemplate resume={resume} ref={resumeRef} />
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleDownloadPDF}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/70"
                >
                  🚀 Download PDF
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-screen w-full">

  <div className="text-center">
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className="wheel-and-hamster mx-auto mb-6"
    >
      <div className="wheel" />
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear" />
            <div className="hamster__eye" />
            <div className="hamster__nose" />
          </div>
          <div className="hamster__limb hamster__limb--fr" />
          <div className="hamster__limb hamster__limb--fl" />
          <div className="hamster__limb hamster__limb--br" />
          <div className="hamster__limb hamster__limb--bl" />
          <div className="hamster__tail" />
        </div>
      </div>
      <div className="spoke" />
    </div>

    <div className="textWrapper">
      <p className="text text-lg font-semibold">Generating Your Resume...</p>
      <div className="invertbox mx-auto mt-2" />
    </div>
  </div>
  
</div>

          )}
        </div>
      </div>
    </div>
  )

};

export default AIResumeOutput;
