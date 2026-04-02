import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col xl:flex-row text-white font-sans text-sm tracking-wide">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 w-full bg-[#0e0e0e] max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
