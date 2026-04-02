import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans text-zinc-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-zinc-900 p-6 flex flex-col pt-10">
        <h1 className="text-xl font-extrabold text-white tracking-widest uppercase mb-12">FinDash</h1>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="block px-4 py-2.5 bg-zinc-900 text-white font-medium rounded-md border border-zinc-800">Overview</Link>
          <Link to="/transaction" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Transactions</Link>
          <Link to="/goals" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Goals</Link>
        </nav>
        <div className="mt-auto pt-8 border-t border-zinc-900">
          <Link to="/" className="block px-4 py-2 text-sm text-zinc-500 hover:text-white transition-colors">Logout</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 relative">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Overview</h2>
            <p className="text-zinc-500 mt-1 text-sm">Your financial summary at a glance.</p>
          </div>
          <button className="bg-transparent border border-zinc-800 hover:border-zinc-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Export Data
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Total Net Worth', value: '$245,000.00', trend: '+4.5%' },
            { title: 'Monthly Burn', value: '$3,240.50', trend: '-1.2%' },
            { title: 'Liquid Assets', value: '$84,200.00', trend: '+12.4%' }
          ].map((stat, i) => (
            <div key={i} className="bg-black border border-zinc-900 rounded-xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{stat.title}</h3>
              <div className="flex items-baseline justify-between mt-2 relative z-10">
                <span className="text-3xl font-light text-white tracking-tight">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-black border border-zinc-900 rounded-xl p-8">
          <h3 className="text-lg font-medium text-white mb-6">Cash Flow</h3>
          <div className="h-64 flex items-center justify-center border border-zinc-900 rounded-lg bg-zinc-950">
            <p className="text-zinc-600 text-sm">Aesthetic chart placeholder</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
