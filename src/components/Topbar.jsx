import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut, Moon, Sun } from 'lucide-react';
import { clearStoredUser, getStoredUser } from '../utils/storage';

const THEME_STORAGE_KEY = 'finance_dashboard_theme';

function Topbar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const userName = user?.name || 'Guest User';
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login', { replace: true });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="bg-[var(--app-topbar)] text-[var(--app-text)] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 md:px-8 py-4 sticky top-0 z-40 border-b border-[color:var(--app-border)]">
      {/* Left: Profile Area */}
      <div className="flex items-center space-x-3 cursor-pointer group min-w-0">
        <div className="w-11 h-11 rounded-full bg-[var(--app-surface)] border border-[color:var(--app-border-strong)] overflow-hidden group-hover:border-[#555] transition-colors shadow-[0_0_10px_rgba(34,211,238,0.1)] shrink-0">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=1f1f1f" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold block truncate">{userName}</p>
          <p className="text-xs text-[var(--app-muted)] block">Hello, Welcome back!</p>
        </div>
      </div>

      {/* Right: Search, Notification */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Search Bar */}
        <div className="relative flex items-center w-full lg:w-auto order-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[var(--app-subtle)]" />
          </div>
          <input 
            type="text" 
            placeholder="Search or type command" 
            className="w-full lg:w-64 xl:w-[320px] bg-[var(--app-surface)] border border-[color:var(--app-border)] text-sm rounded-xl pl-10 pr-10 py-2.5 text-[var(--app-text)] placeholder-[var(--app-subtle)] focus:outline-none focus:border-[#444] transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2 items-center hidden sm:flex">
            <kbd className="bg-[var(--app-topbar)] text-[var(--app-muted)] text-[10px] px-1.5 py-0.5 rounded border border-[color:var(--app-border-strong)]">F</kbd>
          </div>
        </div>

        <div className="flex items-center gap-3 order-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center bg-[var(--app-surface)] border border-[color:var(--app-border)] hover:border-[#444] px-3 py-2.5 rounded-xl transition-colors space-x-2 flex-1 sm:flex-none"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
          <span className="text-sm font-medium">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
        <button className="flex items-center justify-center bg-[var(--app-surface)] border border-[color:var(--app-border)] hover:border-[#444] px-3 py-2.5 rounded-xl transition-colors space-x-2 flex-1 sm:flex-none">
          <Bell className="w-5 h-5" />
          <span className="bg-cyan-200 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.4)] whitespace-nowrap">2 New</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center bg-[var(--app-surface)] border border-[color:var(--app-border)] hover:border-red-500/60 hover:text-red-300 px-3 py-2.5 rounded-xl transition-colors space-x-2 text-[var(--app-text)] flex-1 sm:flex-none"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
