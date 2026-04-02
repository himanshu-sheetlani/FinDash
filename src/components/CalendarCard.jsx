import React from 'react';

function CalendarCard() {
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-white">Overview</h2>
        <p className="text-xs text-[#888]">March 2026</p>
      </div>
      <hr className="border-[#333] mb-4" />
      <div className="flex justify-between mb-6 pb-4 border-b border-[#222]">
        <div className="text-center">
          <p className="text-xl font-semibold text-white tracking-tight">40</p>
          <p className="text-[10px] text-[#666] uppercase tracking-wider mt-1">Transaction</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-green-400 tracking-tight">24</p>
          <p className="text-[10px] text-[#666] uppercase tracking-wider mt-1">Income</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-red-400 tracking-tight">16</p>
          <p className="text-[10px] text-[#666] uppercase tracking-wider mt-1">Outcome</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
        {['S','M','T','W','T','F','S'].map((day, i) => (
          <div key={i} className="text-[10px] font-medium text-cyan-400 font-semibold mb-1">{day}</div>
        ))}
        {[...Array(31)].map((_, i) => {
          const dayNum = i + 1;
          const isToday = 17;
          
          const hasData = dayNum <= isToday;
          let earned = 0, expense = 0, isProfit = true;
          if (hasData) {
            earned = (dayNum * 145) % 800 + 200;
            expense = (dayNum * 113) % 700 + 100;
            isProfit = earned >= expense;
          }

          return (
            <div key={i} className="relative group hover:z-30 flex justify-center items-center h-8">
              <span className={`relative w-7 h-7 flex items-center justify-center rounded-full text-xs transition-colors cursor-pointer
                ${dayNum == isToday ? 'bg-cyan-400 text-black font-semibold' : 
                  dayNum > isToday ? 'text-[#555]' : 'text-white hover:bg-[#222]'}`}
              >
                {dayNum}
                {hasData && (
                  <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}></span>
                )}
              </span>
              
              {hasData && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col bg-[#222] border border-[#333] text-[10px] rounded p-1.5 shadow-xl w-max min-w-[90px] pointer-events-none">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[#888]">Earn</span>
                    <span className="text-green-400 font-medium">+${earned}</span>
                  </div>
                  <div className="flex justify-between items-center gap-3 mt-1">
                    <span className="text-[#888]">Spend</span>
                    <span className="text-red-400 font-medium">-${expense}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarCard;
