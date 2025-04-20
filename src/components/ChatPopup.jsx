import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChatDotsFill, BsXCircleFill } from "react-icons/bs";
import sendSound from '../assets/recive.mp3';
import receiveSound from '../assets/send.mp3';


const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  //   const sendAudio = new Audio('/sounds/send.mp3');     // or sendSound if imported
  // const receiveAudio = new Audio('/sounds/receive.mp3');


  // ✅ Create Audio objects ONCE
  const sendAudioRef = useRef(null);
  const receiveAudioRef = useRef(null);

  useEffect(() => {
    sendAudioRef.current = new Audio(sendSound);
    receiveAudioRef.current = new Audio(receiveSound);
  }, []);


  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    sendAudioRef.current?.play();

    const systemPrompt = {
      role: "system",
      content: `You are CareerGenie AI, a smart career assistant for a job portal named CareerGenie. 
    CareerGenie helps users with job searching, resume building, AI-generated resumes, skill assessments with certifications, career roadmap generation, and video resume submissions. 
    You can answer questions about career paths, resume tips, how to apply to jobs, and how CareerGenie can help users in their job journey.
    Career Genie also have a premium membership plan for 499 rupees and buying it will give the users various perks, the perks are ai generated resume,exclusive job listing,recruiter contact details,exclusive career webinars etc. give all these info in about 3 to 4 lines.`, // truncated for brevity
    };

    const updatedMessagesWithSystem = [
      systemPrompt,
      ...updatedMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: updatedMessagesWithSystem,
        }),
      });

      const data = await response.json();
      const botReply = data.choices[0].message.content;
      const finalMessages = [...updatedMessages, { sender: "bot", text: botReply }];
      setMessages(finalMessages);
      receiveAudioRef.current?.play();

      // ✅ Save to MongoDB
      await fetch("https://career-genie-server.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...updatedMessages, { sender: "bot", text: botReply }] }),
      });


    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const res = await fetch("https://career-genie-server.vercel.app/api/chat");
  //       const data = await res.json();
  //       if (data.length > 0) {
  //         setMessages(data[data.length - 1].messages); // Load latest chat
  //       }
  //     } catch (err) {
  //       console.error("Failed to load chat history", err);
  //     }
  //   };

  //   fetchChats();
  // }, []);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Chat Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* Header */}
              <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
                <div className="font-semibold">CareerGenie • AI Agent</div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm bg-gray-50">
                {messages.length === 0 && (
                  <div className="bg-gray-200 p-3 rounded-md text-gray-800 text-sm">
                    👋 Welcome to CareerGenie! Ask me anything about careers, resumes, or jobs.
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  
                ))}
                {/* Sci-Fi Typing Animation (White Only) */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div class="lds-ellipsis"><div></div><div></div><div></div></div>
                  </div>
                )}

                <div ref={bottomRef} />

              </div>

              {/* Input */}
              <div className="p-3 border-t bg-[radial-gradient(#173d49_85%,_#36a6f1_90%,_#0d1725_20%)] flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"
                  placeholder="Ask a question..."
                />
                <button

                  onClick={handleSend}
                  className="ruby77 "
                >
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                      </svg>
                    </div>
                  </div>
                  Send
                </button>
              </div>
            </motion.div>

            {/* Minimize Button Outside the Box */}
            <div className="flex justify-end mt-2 pr-1">
              <button
                onClick={() => setIsOpen(false)}
                className="Bttt"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="Bttt"
        >
          <BsChatDotsFill size={22} />
        </motion.button>
      )}
    </div>
  );

};

export default ChatPopup;
