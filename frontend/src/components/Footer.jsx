import React from 'react'
import { FiGithub, FiTwitter, FiLinkedin, FiMessageCircle, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
   <footer className="bg-white border-t border-gray-100 mt-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <FiMessageCircle size={18} />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase text-gray-900">ChatApp</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              The ultimate communication platform for modern teams. Secure, encrypted, and designed for high-performance collaboration.
            </p>
          </div>

          {/* Links: Product */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a></li>
            </ul>
          </div>

          {/* Links: Resources */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Links: Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span>© 2026 ChatApp Inc. Made with</span>
            <FiHeart className="text-red-400 fill-red-400 mx-0.5" size={12} />
            <span>by your team.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-indigo-600 transition-colors"><FiGithub size={20} /></a>
            <a href="#" className="hover:text-indigo-600 transition-colors"><FiLinkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
