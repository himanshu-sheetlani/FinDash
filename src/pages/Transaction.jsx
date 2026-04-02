import React from 'react';
import { Link } from 'react-router-dom';

function Transaction() {
  const transactions = [
    { id: 1, desc: 'Apple Store', date: 'Oct 24, 2026', amount: '-$1,299.00', category: 'Hardware' },
    { id: 2, desc: 'Stripe Payout', date: 'Oct 22, 2026', amount: '+$5,400.00', category: 'Revenue' },
    { id: 3, desc: 'Equinox Membership', date: 'Oct 20, 2026', amount: '-$245.20', category: 'Health' },
    { id: 4, desc: 'AWS Services', date: 'Oct 15, 2026', amount: '-$1,800.00', category: 'Infrastructure' },
    { id: 5, desc: 'Uber Premium', date: 'Oct 12, 2026', amount: '-$45.99', category: 'Transport' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row text-zinc-200 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-zinc-900 p-6 flex flex-col pt-10 hidden md:flex">
        <h1 className="text-xl font-extrabold text-white tracking-widest uppercase mb-12">FinDash</h1>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Overview</Link>
          <Link to="/transaction" className="block px-4 py-2.5 bg-zinc-900 text-white font-medium rounded-md border border-zinc-800">Transactions</Link>
          <Link to="/goals" className="block px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">Goals</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Ledger</h2>
            <p className="text-zinc-500 mt-1 text-sm">A complete history of your transactions.</p>
          </div>
        </header>

        <div className="bg-black rounded-xl border border-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-900">
                  <th className="font-semibold p-5 pl-8">Merchant</th>
                  <th className="font-semibold p-5 hidden sm:table-cell">Category</th>
                  <th className="font-semibold p-5 hidden sm:table-cell">Date</th>
                  <th className="font-semibold p-5 pr-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-zinc-900/40 transition-colors group">
                    <td className="p-5 pl-8">
                      <p className="font-medium text-white">{t.desc}</p>
                      <p className="text-xs text-zinc-500 sm:hidden mt-1">{t.date}</p>
                    </td>
                    <td className="p-5 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {t.category}
                      </span>
                    </td>
                    <td className="p-5 text-zinc-500 text-sm hidden sm:table-cell">{t.date}</td>
                    <td className={`p-5 pr-8 text-right font-medium ${t.amount.startsWith('+') ? 'text-white' : 'text-zinc-400'}`}>
                      {t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Transaction;
