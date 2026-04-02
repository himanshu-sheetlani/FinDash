import React from "react";

function YearlySummaryCard() {
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6 pb-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-white">Yearly Summary</h2>
        <button className="text-xs text-[#888] flex items-center hover:text-white transition-colors">
          2026{" "}
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <hr className="border-[#333] mb-4" />
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a]">
          <p className="text-xs text-[#888] mb-1">Income</p>
          <p className="text-lg font-medium text-white">₹35,000</p>
          <p className="text-xs text-green-400 mb-1">+12% from last year</p>
        </div>
        <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a]">
          <p className="text-xs text-[#888] mb-1">Expense</p>
          <p className="text-lg font-medium text-white">₹28,000</p>
          <p className="text-xs text-red-400 mb-1">+9% from last year</p>
        </div>
        <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a]">
          <p className="text-xs text-[#888] mb-1">Savings</p>
          <p className="text-lg font-medium text-white">₹7,000</p>
          <p className="text-xs text-green-400 mb-1">+10% from last year</p>
        </div>
      </div>

      {/* <div className="h-32 rounded-xl flex items-end justify-between px-2 gap-2">
        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div 
              className={`w-full max-w-[20px] rounded-t-sm transition-all duration-500 hover:opacity-100 ${i === 4 ? 'bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-[#333] opacity-60'}`} 
              style={{ height: `${h}%` }}
            ></div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default YearlySummaryCard;
