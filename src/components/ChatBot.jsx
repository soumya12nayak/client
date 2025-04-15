// import React, { useState } from "react";
// import axios from "axios";

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;
  
//     const newMessage = { sender: "user", text: input };
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setInput("");
  
//     try {
//       const response = await axios.post(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           model: "deepseek/deepseek-chat:free",
//           messages: updatedMessages.map((msg) => ({
//             role: msg.sender === "user" ? "user" : "assistant",
//             content: msg.text,
//           })),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       const botReply = response.data.choices[0].message.content;
//       const botMessage = { sender: "bot", text: botReply };
//       const finalMessages = [...updatedMessages, botMessage];
  
//       setMessages(finalMessages);
  
//       await axios.post("http://localhost:5000/api/chat", {
//         messages: finalMessages,
//       });
      
  
//     } catch (err) {
//       console.error("❌ Error fetching AI response or saving chat:", err);
//     }
//   };

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await axios.get("/api/chat");
//         if (res.data.length > 0) {
//           setMessages(res.data[res.data.length - 1].messages); // load last conversation
//         }
//       } catch (err) {
//         console.error("Error loading chat history", err);
//       }
//     };
  
//     fetchChats();
//   }, []);
  
  

//   return (
//     <div className="bg-[#0f172a] p-4 rounded shadow w-full max-w-xl mx-auto mt-8 text-white">
//       <div className="h-64 overflow-y-auto mb-4 border p-3 rounded space-y-2 bg-[#1e293b]">
//         {messages.map((msg, i) => (
//           <div key={i} className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//             <span className="inline-block bg-cyan-600 px-3 py-2 rounded-lg">{msg.text}</span>
//           </div>
//         ))}
//       </div>
//       <div className="flex space-x-2">
//         <input
//           className="flex-1 px-4 py-2 rounded bg-[#334155] text-white focus:outline-none"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//         />
//         <button
//           onClick={handleSend}
//           className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-400 text-black font-bold"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
