import React from 'react';

function GoalsCard() {
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">My Goals</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Married</p>
                <p className="text-[10px] text-[#888]">Achieved in 2 months!</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white">₹12.500,00</p>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ width: '80%' }}></div>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Basketball</p>
                <p className="text-[10px] text-[#888]">Achieved in 4 months!</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white">₹4.800,00</p>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ width: '55%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalsCard;
