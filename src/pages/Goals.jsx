import React from 'react';
import { Link } from 'react-router-dom';

function Goals() {
  const goals = [
    { title: 'Real Estate Fund', target: 100000, current: 82000 },
    { title: 'Porsche 911', target: 145000, current: 25000 },
    { title: 'World Tour', target: 30000, current: 28000 },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row text-zinc-200 font-sans">
      <aside className="w-full md:w-64 bg-black border-r border-zinc-900 p-6 flex flex-col pt-10 hidden md:flex">
        <h1 className="text-xl font-extrabold text-white tracking-widest uppercase mb-12">FinDash</h1>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Overview</Link>
          <Link to="/transaction" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Transactions</Link>
          <Link to="/goals" className="block px-4 py-2.5 bg-zinc-900 text-white font-medium rounded-md border border-zinc-800">Goals</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Objectives</h2>
            <p className="text-zinc-500 mt-1 text-sm">Milestones for your wealth accumulation.</p>
          </div>
          <button className="bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-md text-sm font-semibold transition-colors">
            Create Goal
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, i) => {
            const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={i} className="bg-black border border-zinc-900 hover:border-zinc-700 transition-colors rounded-xl p-8 relative overflow-hidden">
                <div className="flex justify-between items-end mb-6 relative z-10">
                  <h3 className="text-lg font-medium text-white tracking-tight">{goal.title}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-light text-white">${goal.current.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Goal: ${goal.target.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="w-full bg-zinc-900 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div 
                    className="bg-zinc-300 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                
                <p className="text-xs font-semibold text-zinc-500 text-right">{percent}% ACHIEVED</p>
              </div>
            );
          })}

          <div className="bg-black border border-dashed border-zinc-800 hover:border-zinc-600 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[220px]">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center mb-4">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-1">New Objective</h3>
            <p className="text-xs text-zinc-500">Define a new financial target</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Goals;
