import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="w-full xl:w-[260px] bg-[#121212] border-r border-[#222] flex flex-col xl:h-screen xl:sticky xl:top-0">
      <div className="p-6 pb-2">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-cyan-200 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rotate-45 transform"></div>
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-none">Finomic</h1>
            <p className="text-[#7d7d7d] text-xs mt-0.5">Financial Assistant</p>
          </div>
          <div className="ml-auto flex items-center justify-center w-5 h-5 rounded border border-[#333]">
            <div className="w-3 h-1.5 border-b border-l border-white transform -rotate-45 -mt-1"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4">
        <p className="text-[#666] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2">Menu</p>
        <nav className="space-y-1 mb-8">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/dashboard' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <svg className={`w-5 h-5 mr-3 ${path === '/dashboard' ? 'text-black' : 'text-[#888]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
            {path === '/dashboard' && (
              <svg className="w-4 h-4 ml-auto text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </Link>
          <Link 
            to="/transaction" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/transaction' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Transactions
          </Link>
          <Link 
            to="/goals" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/goals' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            My Goals
          </Link>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Investment
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Bills and Payment
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Analytics and Reports
          </a>
        </nav>

        <p className="text-[#666] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2">Support</p>
        <nav className="space-y-1 mb-8">
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Helps
          </a>
        </nav>
      </div>

      {/* Pro Card */}
      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-b from-[#222] to-[#121212] rounded-2xl p-5 border border-[#333] text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-400/[0.02]"></div>
          <h3 className="text-white font-semibold mb-1 relative z-10">Become Pro Access</h3>
          <p className="text-[#888] text-xs mb-4 leading-relaxed relative z-10">Try your experience for using more features</p>
          <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2.5 rounded-xl transition-colors relative z-10 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Upgrade Pro
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
