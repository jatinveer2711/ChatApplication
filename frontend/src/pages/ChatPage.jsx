import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiSend, FiPaperclip } from "react-icons/fi";
import { socket } from "../components/socket.js";

export default function ChatPage() {
    const { id } = useParams()
    // console.log("Chat ID:", id);
    const [messages, setMessages] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")

    // fetch messages


    const fetchMessages = async () => {
        setLoading(true)
        setError("")
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(`http://localhost:4000/api/message/getMessages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setMessages(res.data.messages)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch messages")
        } finally {
            setLoading(false)
        }
    }

    // delete messages
  const deleteMessages = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(
      `http://localhost:4000/api/message/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {

      // UI update immediately
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );

      // 🔥 SOCKET EMIT
      socket.emit("deleteMessage", id);
    }

  } catch (error) {
    setError(error.response?.data?.message || "Failed to delete message");
  }
};

    // send message

 const sendMessage = async () => {
  if (!text.trim()) return;

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:4000/api/message/sendMessage",
      {
        id: id,
        content: text.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newMessage = res.data.messages || res.data;

    // UI update
    setMessages((prev) => [...prev, newMessage]);

    // 🔥 SOCKET EMIT
    socket.emit("sendMessage", newMessage);

    setText("");

  } catch (error) {
    setError(error.response?.data?.message || "Failed to send message");
  }
};

   useEffect(() => {
  if (!id) return;

  fetchMessages();

  socket.connect();

  socket.on("receiveMessage", (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  socket.on("messageDeleted", (messageId) => {
    setMessages((prev) =>
      prev.filter((msg) => msg._id !== messageId)
    );
  });

  return () => {
    socket.off("receiveMessage");
    socket.off("messageDeleted");
  };

}, [id]);

    return (
        <div className="flex flex-col mt-6 h-[600px] max-w-2xl mx-auto bg-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
  
  {/* Chat Header */}
  <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
    <div>
      <h2 className="text-lg font-bold text-gray-800">Conversation</h2>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs text-gray-500 font-medium">Active now</span>
      </div>
    </div>
  </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
    {error && (
      <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm text-center font-medium border border-red-100">
        {error}
      </div>
    )}

    {loading && (
      <div className="flex justify-center py-10">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    )}

    {messages.map((msg) => {
      // Logic to check if the message is from the logged-in user
      const isMe = msg.sender?._id === id; // Ensure you have access to currentUserId

      return (
        <div 
          key={msg._id} 
          className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
        >
          {/* Sender Name (only show for others) */}
          {!isMe && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-1">
              {msg.sender?.firstName}
            </span>
          )}
          
          <div
  className={`
    relative group
    max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all
    ${isMe 
      ? "bg-indigo-600 text-white rounded-tr-none" 
      : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}
  `}
>
  {/* Message */}
  {msg.content}

  {/* Delete Icon (For All Messages) */}
 <button
  onClick={() => window.confirm("Delete this message?") && deleteMessages(msg._id)}
  className="
    absolute -top-3 -right-3
    hidden group-hover:flex
    items-center justify-center
    w-8 h-8
    bg-white/90 dark:bg-zinc-800/90
    text-red-500
    backdrop-blur-sm
    rounded-xl
    shadow-lg shadow-black/5
    border border-zinc-200 dark:border-zinc-700
    hover:scale-110 hover:bg-red-50 hover:text-red-600
    active:scale-95
    transition-all duration-200
  "
  title="Delete Message"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
</button>
</div>

          
          {/* Message Status Indicator */}
          {isMe && (
            <div className="flex items-center justify-end mt-1">
              <span className="text-[9px] text-gray-400">
                {msg.status === "delivered" ? "✓" : "✓✓"}
              </span>
            </div>
          )}
          
          {/* Timestamp Placeholder */}
          <span className="text-[9px] text-gray-400 mt-1 px-1">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      );
    })}
  </div>

  {/* Input Area */}
  <div className="p-4 bg-white border-t border-gray-100">
    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
        <FiPaperclip size={20} />
      </button>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Write a message..."
        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
      />

      <button 
        onClick={sendMessage}
        disabled={!text.trim()}
        className={`
          p-2.5 rounded-lg transition-all
          ${text.trim() 
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95" 
            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
        `}
      >
        <FiSend size={18} />
      </button>
    </div>
  </div>
</div>

    )
}
