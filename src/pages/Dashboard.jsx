import React, { useRef } from 'react';
import gsap from 'gsap';
import BalanceCard from '../components/BalanceCard';
import YearlySummaryCard from '../components/YearlySummaryCard';
import CalendarCard from '../components/CalendarCard';
import RecentTransactions from '../components/RecentTransactions';
import GoalsCard from '../components/GoalsCard';
import useMotionSafeLayoutEffect from '../hooks/useMotionSafeLayoutEffect';

function Dashboard() {
  const pageRef = useRef(null);
  const balanceRef = useRef(null);

  useMotionSafeLayoutEffect(pageRef, () => {
    const balanceElement = balanceRef.current;
    if (!balanceElement) {
      return;
    }

    const bounds = balanceElement.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const cardCenterX = bounds.left + bounds.width / 2;
    const cardCenterY = bounds.top + bounds.height / 2;
    const startX = viewportCenterX - cardCenterX;
    const startY = viewportCenterY - cardCenterY;

    gsap.set(".dashboard-secondary-card", {
      opacity: 0,
      y: 26,
      scale: 0.985,
    });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .set(balanceElement, {
        x: startX,
        y: startY,
        scale: 1.18,
        rotationY: 360,
        opacity: 0,
        zIndex: 20,
        transformOrigin: "center center",
        transformPerspective: 1200,
        // filter: "blur(8px)",
      })
      .to(balanceElement, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(
        balanceElement,
        {
          duration: 1,
        }
      )
      .to(balanceElement, {
        x: 0,
        y: 0,
        scale: 1,
        rotationY: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power4.out",
      })
      .set(balanceElement, {
        clearProps: "zIndex,transformPerspective,filter",
      })
      .to(
        ".dashboard-secondary-card",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.08,
        },
        "-=0.1"
      );
  }, []);

  return (
    <div ref={pageRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      <div ref={balanceRef} className="dashboard-balance-card md:col-span-4">
        <BalanceCard />
      </div>
      <div className="dashboard-secondary-card md:col-span-4">
        <YearlySummaryCard />
      </div>
      <div className="dashboard-secondary-card md:col-span-4">
        <CalendarCard />
      </div>
      <div className="dashboard-secondary-card md:col-span-8">
        <RecentTransactions />
      </div>
      <div className="dashboard-secondary-card md:col-span-4">
        <GoalsCard />
      </div>
    </div>
  );
}

export default Dashboard;
