import React, { useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function DashboardLayout() {
  const layoutRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-sidebar',
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.dashboard-topbar',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.08 }
      );

      gsap.fromTo(
        '.dashboard-content > *',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.12,
        }
      );
    }, layoutRef);

    return () => context.revert();
  }, [location.pathname]);

  return (
    <div ref={layoutRef} className="min-h-screen bg-[var(--app-shell)] text-[var(--app-text)] flex flex-col xl:flex-row font-sans text-sm tracking-wide">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="dashboard-topbar">
          <Topbar />
        </div>
        <main className="dashboard-content flex-1 p-4 sm:p-6 md:p-8 w-full bg-[var(--app-shell)] max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
