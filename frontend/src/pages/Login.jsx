import axios from 'axios'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom' 
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
        const handleSubmit = async (e) => {
            e.preventDefault()
            setError("")
            setLoading(true)
            try {
                const res = await axios.post('https://chatapplication-l7t3.onrender.com/api/user/login', formData)
                login(res.data.user, res.data.token);
                if (res.status === 200) {
                    alert("login succesfully")
                    navigate('/')

                }
            } catch (error) {
                setError(error.response?.data?.message || "login failed")
            } finally {
                setLoading(false)
            }
        }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md px-4 z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Enter your credentials to access your chats
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent border rounded-2xl text-sm font-medium focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent border rounded-2xl text-sm font-medium focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                required
              />
            </div>
            
            <div className="text-right">
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
              <p className="text-red-500 text-xs font-bold text-center leading-tight">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Login to Dashboard
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <button 
              type="button"
              onClick={() => navigate('/signup')}
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
            >
              Sign up for free
            </button>
          </p>
        </form>
      </div>
    </div>
    )
}
