import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWebinar } from "../api/webinarApi";
import { Calendar, User, MessageSquare, Type } from "lucide-react";

const CreateWebinar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", date: "", speaker: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createWebinar(form);
    navigate("/webinars");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f1b38] to-[#16202E] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1b38] border border-[#00C9FF]/20 rounded-xl shadow-2xl shadow-[#00C9FF]/10 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] mb-2">
            Create New Webinar
          </h2>
          <p className="text-[#c4d4f0]">Fill in the details to schedule your webinar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-mono text-[#00C9FF] mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" />
                WEBINAR TITLE
              </label>
              <input
                type="text"
                placeholder="Enter webinar title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a192f] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-mono text-[#00C9FF] mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                DESCRIPTION
              </label>
              <textarea
                placeholder="Enter webinar description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a192f] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF] min-h-[120px]"
                required
              />
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-sm font-mono text-[#00C9FF] mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                DATE & TIME
              </label>
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a192f] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
                required
              />
            </div>

            {/* Speaker Field */}
            <div>
              <label className="block text-sm font-mono text-[#00C9FF] mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                HOST NAME
              </label>
              <input
                type="text"
                placeholder="Enter host name"
                value={form.speaker}
                onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a192f] border border-[#00C9FF]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/webinars")}
              className="flex-1 px-4 py-3 border border-[#00C9FF] text-[#00C9FF] rounded-lg hover:bg-[#00C9FF]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Webinar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWebinar;