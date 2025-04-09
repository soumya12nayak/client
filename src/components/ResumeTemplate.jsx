import React, { useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const ResumeTemplate = React.forwardRef(({ resume }, ref) => {
  const [editMode, setEditMode] = useState(false);
  const [localResume, setLocalResume] = useState(resume);

  // Sync prop with local state only once when resume is initially passed in
  useEffect(() => {
    if (resume) {
      setLocalResume({ ...resume });
    }
  }, [resume]);

  const handlePrint = useReactToPrint({ content: () => ref.current });

  if (!localResume || !localResume.personal_info) {
    return <div className="text-red-600">⚠️ Invalid or missing resume data.</div>;
  }

  const {
    personal_info,
    title,
    summary,
    skills,
    experience,
    education,
    certificates,
    languages,
  } = localResume;

  const updateField = (section, key, value) => {
    setLocalResume((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };
  
  const updateList = (section, index, key, value) => {
    setLocalResume((prev) => {
      const updatedList = [...(prev[section] || [])];
      updatedList[index] = { ...updatedList[index], [key]: value };
      return { ...prev, [section]: updatedList };
    });
  };
  
  const addToList = (section, defaultItem) => {
    setLocalResume((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem],
    }));
  };
  
  const removeFromList = (section, idx) => {
    setLocalResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));
  };


  return (
    <div className="px-6 py-4">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          {editMode ? "Save" : "Edit"}
        </button>
        {/* <button
          onClick={handlePrint}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Download PDF
        </button> */}
      </div>

      {/* ✅ ref applied here */}
      <div ref={ref} className="bg-white p-4 text-sm max-w-[800px] mx-auto text-gray-900">
        {/* HEADER */}
        <div className="text-center border-b pb-4">
          {editMode ? (
            <>
              <input
                type="text"
                defaultValue={personal_info.name}
                onChange={(e) => updateField("personal_info", "name", e.target.value)}
                className="text-3xl font-bold text-center w-full"
              />
              <input
                type="text"
                defaultValue={title}
                onChange={(e) => (resume.title = e.target.value)}
                className="text-lg text-center w-full text-gray-600"
              />
              <textarea
                defaultValue={summary}
                onChange={(e) => (resume.summary = e.target.value)}
                className="text-sm w-full mt-2 text-center"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{personal_info.name}</h1>
              <p className="text-lg text-gray-600">{title}</p>
              <p className="text-sm mt-2 text-gray-700">{summary}</p>
            </>
          )}
          <div className="text-sm mt-2 text-gray-600 flex justify-center gap-4">
            <span>{personal_info.email}</span>
            <span>{personal_info.phone}</span>
            <span>{personal_info.location}</span>
            <span>{personal_info.linkedin}</span>
          </div>
        </div>

 {/* WORK EXPERIENCE */}
{experience?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">WORK EXPERIENCE</h2>
    {experience.map((exp, idx) => (
      <div key={idx} className="mb-4 relative">
        {editMode ? (
          <div className="flex flex-col gap-2">
            <input type="text" defaultValue={exp.title} placeholder="Role" className="font-semibold w-full"
              onChange={(e) => updateList("experience", idx, "title", e.target.value)} />
            <input type="text" defaultValue={exp.company} placeholder="Company" className="italic w-full"
              onChange={(e) => updateList("experience", idx, "company", e.target.value)} />
            <input type="text" defaultValue={exp.dates} placeholder="Dates" className="text-sm italic w-full"
              onChange={(e) => updateList("experience", idx, "dates", e.target.value)} />
            <textarea defaultValue={exp.description} placeholder="Description" className="text-sm w-full"
              onChange={(e) => updateList("experience", idx, "description", e.target.value)} />
            <button onClick={() => removeFromList("experience", idx)} className="text-red-500 text-sm mt-1">Remove</button>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold">{exp.title} – {exp.company}</p>
            <p className="text-sm italic text-gray-600">{exp.dates}</p>
            <p className="text-sm text-gray-800">{exp.description}</p>
          </div>
        )}
      </div>
    ))}
    {editMode && (
      <button onClick={() => addToList("experience", { title: "", company: "", dates: "", description: "" })}
        className="text-sm text-blue-600 mt-2">+ Add Experience</button>
    )}
  </div>
)}

{/* SKILLS */}
{skills?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">SKILLS</h2>
    <ul className="grid grid-cols-2 list-disc list-inside">
      {skills.map((skill, idx) => (
        <li key={idx}>
          {editMode ? (
            <div className="flex items-center gap-2">
              <input defaultValue={skill} onChange={(e) => updateList("skills", idx, "", e.target.value)} />
              <button onClick={() => removeFromList("skills", idx)} className="text-red-500 text-sm">✕</button>
            </div>
          ) : (
            skill
          )}
        </li>
      ))}
    </ul>
    {editMode && (
      <button className="mt-2 text-sm text-blue-600" onClick={() => addToList("skills", "")}>+ Add Skill</button>
    )}
  </div>
)}

{/* PROJECTS */}
{resume.projects?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">PROJECTS</h2>
    {resume.projects.map((project, idx) => (
      <div key={idx} className="mb-4">
        {editMode ? (
          <div className="flex flex-col gap-2">
            <input type="text" defaultValue={project.name} placeholder="Project Name" className="font-semibold w-full"
              onChange={(e) => updateList("projects", idx, "name", e.target.value)} />
            <textarea defaultValue={project.description} placeholder="Project Description" className="text-sm w-full"
              onChange={(e) => updateList("projects", idx, "description", e.target.value)} />
            <input type="text" defaultValue={project.tech_stack} placeholder="Tech Stack" className="text-sm w-full"
              onChange={(e) => updateList("projects", idx, "tech_stack", e.target.value)} />
            <input type="text" defaultValue={project.link} placeholder="Link" className="text-sm w-full"
              onChange={(e) => updateList("projects", idx, "link", e.target.value)} />
            <button onClick={() => removeFromList("projects", idx)} className="text-red-500 text-sm">Remove</button>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold">{project.name}</p>
            <p className="text-sm text-gray-800">{project.description}</p>
            <p className="text-sm italic text-gray-600">Tech: {project.tech_stack}</p>
            {project.link && (
              <a href={project.link} className="text-sm text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                {project.link}
              </a>
            )}
          </div>
        )}
      </div>
    ))}
    {editMode && (
      <button className="mt-2 text-sm text-blue-600" onClick={() =>
        addToList("projects", { name: "", description: "", tech_stack: "", link: "" })
      }>+ Add Project</button>
    )}
  </div>
)}

{/* CERTIFICATES */}
{certificates?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">CERTIFICATES</h2>
    {certificates.map((cert, idx) => (
      <div key={idx} className="mb-4">
        {editMode ? (
          <>
            <input type="text" defaultValue={cert.name} placeholder="Certificate Name" className="font-semibold w-full mb-1"
              onChange={(e) => updateList("certificates", idx, "name", e.target.value)} />
            <input type="text" defaultValue={cert.issuer} placeholder="Issued By" className="italic w-full mb-1"
              onChange={(e) => updateList("certificates", idx, "issuer", e.target.value)} />
            <input type="text" defaultValue={cert.link} placeholder="URL" className="text-sm w-full"
              onChange={(e) => updateList("certificates", idx, "link", e.target.value)} />
            <button onClick={() => removeFromList("certificates", idx)} className="text-red-500 text-sm mt-1">Remove</button>
          </>
        ) : (
          <>
            <p className="font-semibold">{cert.name}</p>
            <p className="text-sm italic">{cert.issuer}</p>
            {cert.link && (
              <a href={cert.link} className="text-sm text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            )}
          </>
        )}
      </div>
    ))}
    {editMode && (
      <button onClick={() => addToList("certificates", { name: "", issuer: "", link: "" })}
        className="text-sm text-blue-600">+ Add Certificate</button>
    )}
  </div>
)}

{/* EDUCATION */}
{education?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">EDUCATION</h2>
    {education.sort((a, b) => parseInt(b.graduation_year) - parseInt(a.graduation_year)).map((edu, idx) => (
      <div key={idx} className="mb-4">
        {editMode ? (
          <>
            <input type="text" defaultValue={edu.degree} placeholder="Degree" className="w-full mb-1 font-semibold"
              onChange={(e) => updateList("education", idx, "degree", e.target.value)} />
            <input type="text" defaultValue={edu.major} placeholder="Major" className="w-full mb-1"
              onChange={(e) => updateList("education", idx, "major", e.target.value)} />
            <input type="text" defaultValue={edu.institution} placeholder="Institution" className="w-full mb-1 italic"
              onChange={(e) => updateList("education", idx, "institution", e.target.value)} />
            <input type="number" defaultValue={edu.graduation_year} placeholder="Year" className="w-full text-sm"
              onChange={(e) => updateList("education", idx, "graduation_year", e.target.value)} />
            <button onClick={() => removeFromList("education", idx)} className="text-red-500 text-sm mt-1">Remove</button>
          </>
        ) : (
          <>
            <p className="font-bold">{edu.degree}{edu.major ? ` in ${edu.major}` : ""}</p>
            <p className="text-sm italic">{edu.institution} | {edu.graduation_year}</p>
          </>
        )}
      </div>
    ))}
    {editMode && (
      <button onClick={() =>
        addToList("education", { degree: "", major: "", institution: "", graduation_year: "" })
      } className="text-sm text-blue-600">+ Add Education</button>
    )}
  </div>
)}

{/* LANGUAGES */}
{languages?.length > 0 && (
  <div className="mt-6">
    <h2 className="font-bold text-lg border-b mb-2">LANGUAGES</h2>
    <ul className="list-disc list-inside">
      {languages.map((lang, idx) => (
        <li key={idx} className="mb-2">
          {editMode ? (
            <div className="flex flex-col gap-1">
              <input type="text" defaultValue={lang.language} placeholder="Language" className="w-full"
                onChange={(e) => updateList("languages", idx, "language", e.target.value)} />
              <input type="text" defaultValue={lang.level} placeholder="Proficiency" className="w-full italic"
                onChange={(e) => updateList("languages", idx, "level", e.target.value)} />
              <button onClick={() => removeFromList("languages", idx)} className="text-red-500 text-sm">Remove</button>
            </div>
          ) : (
            <>{lang.language} – <span className="italic">{lang.level}</span></>
          )}
        </li>
      ))}
    </ul>
    {editMode && (
      <button onClick={() => addToList("languages", { language: "", level: "" })} className="text-sm text-blue-600">
        + Add Language
      </button>
    )}
  </div>
)}


      </div>
    </div>
  );
});

export default ResumeTemplate;
