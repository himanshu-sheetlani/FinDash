import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { removeGoal, formatAbsoluteCurrency } from "../utils/storage";
import { ICON_MAP } from "./CreateGoalModal";

export default function GoalItemCard({ goal, openFundModal }) {
  const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
  const isCompleted = percent >= 100;
  const GoalIcon = ICON_MAP[goal.icon] || ICON_MAP.TrendingUp;

  return (
    <div className={`bg-[#161616] border ${isCompleted ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.05)]' : 'border-[#222] hover:border-[#333]'} transition-all duration-300 rounded-2xl p-6 relative overflow-hidden group`}>
      {isCompleted && (
        <div className="absolute -right-8 top-5 bg-cyan-500/20 text-cyan-400 text-[9px] font-bold py-1 px-10 rotate-45 border-b border-cyan-500/30">
          COMPLETED
        </div>
      )}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-cyan-400">
             {React.cloneElement(GoalIcon, { className: "w-4 h-4" })}
          </div>
          <h3 className="text-lg font-medium text-white tracking-tight">{goal.title}</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => removeGoal(goal.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 p-2 rounded-lg text-xs flex items-center justify-center"
            title="Remove Goal"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {!isCompleted && (
            <button 
              onClick={() => openFundModal(goal)}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#222] border border-[#333] hover:border-[#444] text-white p-2 rounded-lg text-xs flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Funds
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-end mb-2 relative z-10">
         <p className="text-2xl font-light text-white">{formatAbsoluteCurrency(goal.current)}</p>
         <p className="text-xs text-[#888] font-medium tracking-wide">Goal: {formatAbsoluteCurrency(goal.target)}</p>
      </div>
      
      <div className="w-full bg-[#2a2a2a] rounded-full h-1.5 mb-3 overflow-hidden relative z-10">
        <div
          className="bg-cyan-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-[10px] font-semibold text-[#666] tracking-wider text-right">
        {percent}% ACHIEVED
      </p>
    </div>
  );
}
