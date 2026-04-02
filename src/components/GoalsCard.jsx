import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Luggage , Car, ChevronRight } from 'lucide-react';

function GoalsCard() {
  const navigate = useNavigate();
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-white">My Goals</h2>
        <button className="text-xs text-white border border-[#333] hover:bg-[#222] px-3 py-1.5 rounded-lg flex items-center transition-colors" onClick={() => navigate('/goals')}>
          View All
          <ChevronRight className="w-3 h-3 ml-1.5" />
        </button>
      </div>
      <hr className="border-[#333] mb-4" />

      <div className="space-y-4">
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center mr-3">
                <Luggage className="w-4 h-4 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Annual Vacation</p>
                <p className="text-[10px] text-[#888]">Achieve in 3 Months!</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white">₹12,000</p>
          </div>
          <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center mr-3">
                <Car className="w-4 h-4 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Car</p>
                <p className="text-[10px] text-[#888]">Achieve in 3 Year!</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white">₹5,00,000</p>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ width: '27%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalsCard;
