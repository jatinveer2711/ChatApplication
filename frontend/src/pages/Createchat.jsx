import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMessageSquare, FiUserPlus } from "react-icons/fi";

export default function Createchat() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    // handle search

    const handleSearch = async (text) => {
        if(text.trim()===""){
            setData([])
            setLoading(false)
            return
        }
        setError("")
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`http://localhost:4000/api/user/search?keyword=${text}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch messages")
        } finally {
            setLoading(false)
        }
    }
    // access chat
    const accessChat  = async (userId)=>{
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const res = await axios.post('http://localhost:4000/api/chat/accesschat',{userId},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log( "chat createrd succussfully",res.data)
            navigate(`/chats/${res.data._id}`)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create chat")
        } finally {
            setLoading(false)
        }
    }
    return (
     <div className="w-full max-w-md mx-auto mt-6 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
  
  {/* Header Section */}
  <div className="p-6 pb-4 bg-gradient-to-b from-gray-50 to-white">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
        <FiUserPlus size={20} />
      </div>
      <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">
        New Conversation
      </h2>
    </div>

    {/* Search Input Box */}
    <div className="relative group">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      <input
        type="text"
        placeholder="Search by name or email..."
        onChange={(e) => handleSearch(e.target.value)}
        className="
          w-full pl-11 pr-4 py-3
          bg-gray-100 border-transparent border
          text-sm font-medium text-gray-700
          rounded-2xl transition-all duration-200
          focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5
          focus:outline-none placeholder:text-gray-400
        "
      />
    </div>
  </div>

  {/* Results Section */}
  <div className="px-4 pb-6">
    <div className="space-y-2 max-h-[400px] overflow-y-auto px-2 custom-scrollbar">
      
      {/* Professional Loading State (Skeleton) */}
      {loading && [1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}

      {/* Error Message */}
      {error && (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-xs font-semibold text-red-500">{error}</p>
        </div>
      )}

      {/* User List */}
      {!loading && data.map((user) => (
        <div
          key={user._id}
          onClick={() => accessChat(user._id)}
          className="
            group flex items-center justify-between
            p-3 rounded-2xl
            cursor-pointer
            hover:bg-blue-50/50 transition-all duration-200
          "
        >
          <div className="flex items-center gap-3">
            {/* Avatar with dynamic Initial */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user.firstName[0]}{user.lastName[0]}
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-sm text-gray-800 group-hover:text-blue-700 transition-colors">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-[11px] text-gray-400 font-medium truncate max-w-[150px]">
                {user.email}
              </span>
            </div>
          </div>

          {/* Minimal Action Button */}
          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-blue-200 text-blue-600 text-[11px] font-bold rounded-xl shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
              <FiMessageSquare size={14} />
              CHAT
            </button>
          </div>
        </div>
      ))}

      {/* No Result State */}
      {!loading && data.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <FiSearch size={24} className="text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-500">No users found</p>
          <p className="text-xs text-gray-400">Try a different name or email</p>
        </div>
      )}
    </div>
  </div>
</div>

    )
}
