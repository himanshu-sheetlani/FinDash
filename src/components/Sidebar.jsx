import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, Target, Database, CreditCard, HelpCircle, Zap, ChevronRight } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;
  const navItemClass = (isActive) =>
    `flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
      isActive
        ? "bg-cyan-200 text-black font-medium"
        : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
    }`;

  return (
    <aside className="w-full xl:w-[260px] bg-[var(--app-sidebar)] text-[var(--app-text)] border-b xl:border-b-0 xl:border-r border-[color:var(--app-border)] flex flex-col xl:h-screen xl:sticky xl:top-0">
      <div className="p-4 sm:p-6 pb-3 sm:pb-2">
        <div className="flex items-center space-x-3 mb-4 xl:mb-8">
          <img
            src="/Logo.webp"
            alt="FinDash logo"
            className="w-10 h-10 rounded-xl object-contain bg-[var(--app-surface)] p-1"
          />
          <div>
            <h1 className="font-bold text-base leading-none">FinDash</h1>
            <p className="text-[var(--app-muted)] text-xs mt-0.5">Financial Assistant</p>
          </div>
          {/* <div className="ml-auto flex items-center justify-center w-5 h-5 rounded border border-[#333]">
            <div className="w-3 h-1.5 border-b border-l border-white transform -rotate-45 -mt-1"></div>
          </div> */}
        </div>
      </div>

      <div className="flex-1 xl:overflow-y-auto overflow-x-hidden scrollbar-hide px-3 sm:px-4 pb-4">
        <p className="text-[var(--app-subtle)] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2 hidden xl:block">Menu</p>
        <nav className="flex xl:block gap-2 xl:space-y-1 mb-4 xl:mb-8 overflow-x-auto xl:overflow-visible scrollbar-hide pb-1">
          <Link 
            to="/dashboard" 
            className={navItemClass(path === '/dashboard')}
          >
            <LayoutDashboard className={`w-5 h-5 mr-3 ${path === '/dashboard' ? 'text-black' : 'text-[#888]'}`} />
            Dashboard
            {path === '/dashboard' && (
              <ChevronRight className="w-4 h-4 ml-auto text-black/70" />
            )}
          </Link>
          <Link 
            to="/transaction" 
            className={navItemClass(path === '/transaction')}
          >
            <ArrowRightLeft className="w-5 h-5 mr-3" />
            Transactions
          </Link>
          <Link 
            to="/goals" 
            className={navItemClass(path === '/goals')}
          >
            <Target className="w-5 h-5 mr-3" />
            My Goals
          </Link>
          <Link 
            to="/investment" 
            className={navItemClass(path === '/investment')}
          >
            <Database className={`w-5 h-5 mr-3 ${path === '/investment' ? 'text-black' : 'text-[#888]'}`} />
            Investment
          </Link>
          <Link 
            to="/billing" 
            className={navItemClass(path === '/billing')}
          >
            <CreditCard className={`w-5 h-5 mr-3 ${path === '/billing' ? 'text-black' : 'text-[#888]'}`} />
            Bills and Payment
          </Link>
        </nav>

        <p className="text-[var(--app-subtle)] text-[11px] font-semibold tracking-widest uppercase mb-3 px-2 hidden xl:block">Support</p>
        <nav className="space-y-1 mb-0 xl:mb-8 hidden xl:block">
          <Link
            to="/help"
            className={navItemClass(path === '/help')}
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Helps
          </Link>
        </nav>
      </div>

      <div className="p-4 pt-0 mt-auto hidden xl:block">
        <div className="bg-[var(--app-surface-strong)] rounded-2xl p-5 border border-[color:var(--app-border-strong)] text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-200/[0.02]"></div>
          <h3 className="font-semibold mb-1 relative z-10">Become Pro Access</h3>
          <p className="text-[var(--app-muted)] text-xs mb-4 leading-relaxed relative z-10">Try your experience for using more features</p>
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
