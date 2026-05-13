import axios from 'axios'
import React, { useEffect, useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaSearch } from 'react-icons/fa' ;
import { AuthContext } from '../context/Authcontext';

export default function Chat() {
  const [fetchData, setFetchData] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  const handleFetch = async () => {
    try {
      setLoading(true)
      setError("")
      const token = localStorage.getItem("token")
      const res = await axios.get('http://localhost:4000/api/chat/fetchats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(res.data)
      setFetchData(res.data)

    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch chats")
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleFetch()
  }, [])

  const {user} = useContext(AuthContext)

  //  delete chats 

  const handleDelete = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login again");
        return;
      }
      const res = await axios.delete(`http://localhost:4000/api/chat/delete/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        alert("chat deleted successfully")
        handleFetch() // Refresh the chat list after deletion
      }
    } catch (error) {
      setError(error.response?.data?.message || "failed to delete chat")
    }
  }
  // get name 
  const getChatName = (chat, loggedUserId) => {
    if (chat.isGroupChat) return chat.chatName;

    return chat.users.find(
      (user) => user._id !== loggedUserId
    )?.firstName;
  };

  // search chats
  const handleSearch = async (text) => {
    if (text.trim() === "") {
      handleFetch()
      return
    }
    try {
      setLoading(true)
      setError("")
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:4000/api/chat/search?keyword=${text}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setFetchData(res.data)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to search chats")
    }
    finally {
      setLoading(false)
    }

  }
  return (

    

    // ... inside your component return
    <div className="w-full max-w-md mx-auto mt-6 h-[600px] flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

      {/* Header / Search Area */}
      <div className="p-5 border-b border-gray-50 bg-white z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 text-sm" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value);
            }}
            className="
          w-full
          pl-10 pr-4 py-2.5
          bg-gray-50
          border border-transparent
          text-gray-700
          placeholder-gray-400
          text-sm font-medium
          rounded-xl
          transition-all duration-300
          focus:bg-white
          focus:border-indigo-200
          focus:ring-4 focus:ring-indigo-500/10
          focus:outline-none
        "
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-40 space-y-3">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Syncing chats...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-center">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Chat List */}
        {fetchData.length > 0 && (
          <ul className="space-y-1">
            {fetchData.map((chat) => (
              <li
                key={chat._id}
                onClick={() => navigate(`/chats/${chat._id}`)}
                className="
              group
              relative
              flex items-center justify-between
              px-4 py-3.5
              rounded-xl
              cursor-pointer
              transition-all duration-200
              hover:bg-indigo-50/80
            "
              >
                {/* Chat Info */}
                <div className="flex items-center space-x-3 overflow-hidden">
                  {/* Optional: Add an Avatar placeholder here if available */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                    {getChatName(chat, user._id).charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 truncate transition-colors">
                      {getChatName(chat, user._id)}
                    </p>
                    {/* Optional: Add a subtle timestamp or last message preview here */}
                    <p className="text-xs text-gray-400 truncate group-hover:text-indigo-400/80">
                      Open conversation
                    </p>
                  </div>
                </div>

                {/* Delete Action (Hidden until hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
                    if (confirmDelete) {
                      handleDelete(chat._id);
                    }
                  }}
                  className="
                opacity-0 group-hover:opacity-100
                p-2
                text-gray-400
                hover:text-red-600 hover:bg-red-50
                rounded-lg
                transition-all duration-200
                transform translate-x-2 group-hover:translate-x-0
              "
                  title="Delete chat"
                >
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty State */}
        {fetchData.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <FaSearch className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No conversations found</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  )
}
