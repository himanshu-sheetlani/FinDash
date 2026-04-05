import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--app-shell)] text-[var(--app-text)] flex flex-col xl:flex-row font-sans text-sm tracking-wide">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full bg-[var(--app-shell)] max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
