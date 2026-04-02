import React from 'react';

function BalanceCard() {
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-sm font-semibold text-white">Your Balance</h2>
        <button className="text-xs text-[#888] flex items-center hover:text-white transition-colors">
          US Dollar <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
      <hr className="border-[#333] mb-4" />
      <div className="mb-4 relative z-10">
        <p className="text-xs text-[#888] mb-1">Balance</p>
        <div className="flex justify-between items-end">
          <h1 className="text-4xl font-light tracking-tight text-white font-semibold">₹20,000</h1>
          <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center border border-[#333]">
            <svg className="w-4 h-4 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>
      <p className="text-xs text-[#888] mb-6 relative z-10">Compared to last month <span className="text-green-400 font-medium">+24.17%</span></p>
      
      <div className="relative h-24 border border-[#333] rounded-xl bg-gradient-to-b from-[#1c1c1c] to-[#121212] flex flex-col items-center justify-center z-10 overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-400/[0.02] group-hover:bg-cyan-400/[0.05] transition-colors"></div>
        {/* Map pseudo element / globe design could go here */}
        <div className="relative text-center">
          <h3 className="text-sm font-semibold text-white mb-1 drop-shadow-md">Finance Health</h3>
          <p className="text-[10px] text-[#888] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse"></span> is updating health status now...
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
