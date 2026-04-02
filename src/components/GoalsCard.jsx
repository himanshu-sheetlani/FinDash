import React from 'react';
import { Heart, Trophy } from 'lucide-react';

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
                <Heart className="w-4 h-4 text-cyan-200" />
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
                <Trophy className="w-4 h-4 text-cyan-200" />
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
