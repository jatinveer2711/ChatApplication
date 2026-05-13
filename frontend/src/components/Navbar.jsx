import React, { useContext , useState } from 'react'
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiUsers, 
  FiMessageSquare, 
  FiLogOut, 
  FiMenu,
  FiX,
  FiMessageCircle ,
  // FiMessageCircle 
} from "react-icons/fi";

export default function Navbar() {
    const{logout}  = useContext(AuthContext);
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    
  return (
<nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3 flex justify-between items-center transition-all duration-300">
      
      {/* Logo Section */}
      <div 
        onClick={() => navigate("/chats")}
        className="flex items-center gap-2 cursor-pointer group shrink-0"
      >
        <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:rotate-12 transition-transform shadow-indigo-200 shadow-md">
          <FiMessageCircle size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">
          ChatApp
        </h2>
      </div>

      {/* Desktop Navigation (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center gap-2">
        <NavButton onClick={() => navigate("/chats")} icon={<FiMessageSquare />} label="Chats" />
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        <NavButton onClick={() => navigate("/grup_chats")} icon={<FiUsers />} label="New Group" outline />
        <NavButton onClick={() => navigate("/")} icon={<FiMessageCircle />} label="Home" outline />
        <button
          onClick={() => navigate("/createchats")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-95"
        >
          <FiPlus />
          <span>New Chat</span>
        </button>
      </div>

      {/* Right Side Actions (Always Visible or Mobile Menu Trigger) */}
      <div className="flex items-center gap-2">
        {/* Logout - Hidden on very small screens, moved to menu */}
        <button
          onClick={() => window.confirm("Logout?") && logout()}
          className="hidden sm:flex p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-2 lg:hidden shadow-xl animate-in slide-in-from-top-2">
          <MobileLink onClick={() => navigate("/chats")} icon={<FiMessageSquare />} label="All Chats" />
          <MobileLink onClick={() => navigate("/grup_chats")} icon={<FiUsers />} label="Group Chats" />
          <MobileLink onClick={() => navigate("/")} icon={<FiMessageCircle />} label="Home Page" />
          <hr className="my-1 border-gray-100" />
          <button
            onClick={() => navigate("/createchats")}
            className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl font-medium"
          >
            <FiPlus /> New Chat
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-600 bg-red-50 rounded-xl font-medium"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}
const NavButton = ({ onClick, icon, label, outline }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
      outline 
        ? "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50" 
        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MobileLink = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);
