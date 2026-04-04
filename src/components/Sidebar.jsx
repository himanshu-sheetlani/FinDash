import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, Target, Database, CreditCard, BarChart2, HelpCircle, Zap, ChevronRight } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="w-full xl:w-[260px] bg-[#121212] border-r border-[#222] flex flex-col xl:h-screen xl:sticky xl:top-0">
      <div className="p-6 pb-2">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src="/Logo.webp"
            alt="FinDash logo"
            className="w-10 h-10 rounded-xl object-contain bg-white/5 p-1"
          />
          <div>
            <h1 className="font-bold text-white text-base leading-none">FinDash</h1>
            <p className="text-[#7d7d7d] text-xs mt-0.5">Financial Assistant</p>
          </div>
          {/* <div className="ml-auto flex items-center justify-center w-5 h-5 rounded border border-[#333]">
            <div className="w-3 h-1.5 border-b border-l border-white transform -rotate-45 -mt-1"></div>
          </div> */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4">
        <p className="text-[#666] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2">Menu</p>
        <nav className="space-y-1 mb-8">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/dashboard' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <LayoutDashboard className={`w-5 h-5 mr-3 ${path === '/dashboard' ? 'text-black' : 'text-[#888]'}`} />
            Dashboard
            {path === '/dashboard' && (
              <ChevronRight className="w-4 h-4 ml-auto text-black/70" />
            )}
          </Link>
          <Link 
            to="/transaction" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/transaction' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <ArrowRightLeft className="w-5 h-5 mr-3" />
            Transactions
          </Link>
          <Link 
            to="/goals" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/goals' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <Target className="w-5 h-5 mr-3" />
            My Goals
          </Link>
          <Link 
            to="/investment" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/investment' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <Database className={`w-5 h-5 mr-3 ${path === '/investment' ? 'text-black' : 'text-[#888]'}`} />
            Investment
          </Link>
          <Link 
            to="/billing" 
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${path === '/billing' ? 'bg-cyan-200 text-black font-medium' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <CreditCard className={`w-5 h-5 mr-3 ${path === '/billing' ? 'text-black' : 'text-[#888]'}`} />
            Bills and Payment
          </Link>
        </nav>

        <p className="text-[#666] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2">Support</p>
        <nav className="space-y-1 mb-8">
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
            <HelpCircle className="w-5 h-5 mr-3" />
            Helps
          </a>
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-b from-[#222] to-[#121212] rounded-2xl p-5 border border-[#333] text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-200/[0.02]"></div>
          <h3 className="text-white font-semibold mb-1 relative z-10">Become Pro Access</h3>
          <p className="text-[#888] text-xs mb-4 leading-relaxed relative z-10">Try your experience for using more features</p>
          <button className="w-full bg-cyan-200 hover:bg-cyan-300 text-black font-semibold py-2.5 rounded-xl transition-colors relative z-10 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <Zap className="w-4 h-4 mr-2" />
            Upgrade Pro
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
