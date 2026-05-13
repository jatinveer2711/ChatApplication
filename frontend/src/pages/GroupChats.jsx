import axios from 'axios'
import React, { useState } from 'react' ;
import { FiUsers, FiX, FiSearch, FiCheckCircle } from "react-icons/fi";

export default function GroupChats() {
    const[groupName , setGroupName] = useState("")
    const[users,setUsers] = useState([])
    const[selected , setSelected] = useState([])
    const[error , setError] = useState("")
    const[loading,setLoading] = useState(false)
    const[fetchData , setFetchData] = useState([])
    const handleSearch  = async(text)=>{
        if(!text || text.trim()===""){
            setFetchData([])
            setLoading(false)
            return

        }
        const token = localStorage.getItem("token")
        setLoading(true)
        setError("")
        try {
            const res = await axios.get(`http://localhost:4000/api/user/search?keyword=${text}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setFetchData(res.data)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    // select user
    const handleSelect = (user)=>{
        if(selected.filter((u)=>u._id===user._id).length>0){
            setSelected(selected.filter((u)=>u._id!==user._id))
        }else{
            setSelected([...selected,user])
        }
    }

    // handle remove 
    const handleRemove = async(id)=>{
        setSelected(selected.filter(u=>u._id !== id))
    }

    // create group chat

    const handleCreateGroup = async()=>{
        if(!groupName.trim() || selected.length<2){
            return setError("Please provide a group name and select at least 2 users")
        }
        setError("")
        const token = localStorage.getItem("token")
        try {
            const res = await axios.post(`http://localhost:4000/api/chat/creategroupchat`,{
                chatName:groupName,
                users:selected.map((u)=>u._id)
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.status===201){
                alert("group created succussfully")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Group creation failed")
        }
    }
  return (
  <div className="w-full max-w-md mx-auto mt-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
  
  {/* Header */}
  <div className="p-6 bg-indigo-600 text-white">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
        <FiUsers size={24} />
      </div>
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Create Group</h2>
        <p className="text-indigo-100 text-xs">Bring your team together</p>
      </div>
    </div>
  </div>

  <div className="p-6 space-y-5">
    
    {/* Group Name Input */}
    <div>
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">
        Group Identity
      </label>
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name..."
        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
      />
    </div>

    {/* Search & Selection */}
    <div>
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">
        Add Members ({selected.length})
      </label>
      
      {/* Search Input */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search friends..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
        />
      </div>

      {/* Selected Users "Pills" */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-indigo-50/30 rounded-2xl min-h-[40px]">
          {selected.map((u) => (
            <span
              key={u._id}
              onClick={() => handleRemove(u._id)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white pl-3 pr-1.5 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-red-500 transition-all cursor-pointer group"
            >
              {u.firstName}
              <FiX className="text-indigo-200 group-hover:text-white" size={14} />
            </span>
          ))}
        </div>
      )}

      {/* Search Results List */}
      <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1 pr-1">
        {fetchData.map((u) => (
          <div
            key={u._id}
            onClick={() => handleSelect(u)}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                {u.firstName[0]}
              </div>
              <p className="text-sm font-medium text-gray-700">{u.firstName} {u.lastName}</p>
            </div>
            <FiCheckCircle className="text-gray-200 group-hover:text-indigo-500 transition-colors" />
          </div>
        ))}
        {fetchData.length === 0 && !loading && (
          <p className="text-center py-4 text-xs text-gray-400 italic">Search for users to add...</p>
        )}
      </div>
    </div>

    {/* Error Handling */}
    {error && (
      <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
        <p className="text-red-500 text-xs font-bold text-center">{error}</p>
      </div>
    )}

    {/* Create Button */}
    <button
      onClick={handleCreateGroup}
      disabled={!groupName || selected.length < 2}
      className={`
        w-full py-4 rounded-2xl text-sm font-extrabold tracking-wide uppercase transition-all shadow-lg
        ${(!groupName || selected.length < 2)
          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
          : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-200"}
      `}
    >
      Start Conversation
    </button>
  </div>
</div>

  )
}
