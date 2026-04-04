import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut } from 'lucide-react';
import { clearStoredUser, getStoredUser } from '../utils/storage';

function Topbar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const userName = user?.name || 'Guest User';

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-[88px] bg-[#0e0e0e] flex items-center justify-between px-8 sticky top-0 z-40 border-b border-[#222]">
      {/* Left: Profile Area */}
      <div className="flex items-center space-x-3 cursor-pointer group">
        <div className="w-11 h-11 rounded-full bg-[#1a1a1a] border border-[#333] overflow-hidden group-hover:border-[#555] transition-colors shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=1f1f1f" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white block">{userName}</p>
          <p className="text-xs text-[#888] block">Hello, Welcome back!</p>
        </div>
      </div>

      {/* Right: Search, Notification */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#777]" />
          </div>
          <input 
            type="text" 
            placeholder="Search or type command" 
            className="w-64 lg:w-[320px] bg-[#1a1a1a] border border-[#222] text-sm rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-[#666] focus:outline-none focus:border-[#444] transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <kbd className="bg-[#2a2a2a] text-[#888] text-[10px] px-1.5 py-0.5 rounded border border-[#3a3a3a]">F</kbd>
          </div>
        </div>

        {/* Notification Icon */}
        <button className="flex items-center bg-[#1a1a1a] border border-[#222] hover:border-[#444] px-3 py-2.5 rounded-xl transition-colors space-x-2">
          <Bell className="w-5 h-5 text-white" />
          <span className="bg-cyan-200 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.4)]">2 New</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center bg-[#1a1a1a] border border-[#222] hover:border-red-500/60 hover:text-red-300 px-3 py-2.5 rounded-xl transition-colors space-x-2 text-white"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
