import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiMessageCircle, FiShield, FiZap, FiArrowRight, FiUsers } from "react-icons/fi";

export default function HomePage() {
    const [activeChat, setActiveChat] = useState(null);
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100">




            {/* 2. Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="z-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 border border-indigo-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                            </span>
                            NEW: GROUP VOICE CHANNELS READY
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900 mb-8">
                            Connect with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                zero friction.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            The professional communication platform for modern teams. Secure, lightning fast, and designed to keep you in flow.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/chats"   // 👈 yahan apna route daalo
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 group"
                            >
                                Get Started Free
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all">
                                Live Demo
                            </button>
                        </div>
                    </div>

                    {/* Right Content: App Preview Mockup */}
                    <div className="relative">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

                        {/* Minimalist UI Mockup Window */}
                        <div className="relative bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                            <div className="bg-gray-50 rounded-[2rem] h-[400px] overflow-hidden flex items-center justify-center border border-gray-100">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center">
                                        <FiMessageCircle className="text-indigo-600" size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-24 bg-gray-200 rounded-full mx-auto"></div>
                                        <div className="h-2 w-16 bg-gray-100 rounded-full mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                <FiZap size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Real-time Sync</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Messages delivered in under 20ms across all your connected devices instantly.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                <FiShield size={24} />
                            </div>
                            <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Your privacy is our priority. We use military-grade AES-256 encryption for every chat.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                <FiUsers className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Collaborative Groups</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Easily manage thousands of members with powerful administrative tools and roles.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
