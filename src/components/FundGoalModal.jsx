import React, { useState } from "react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { addFundsToGoal } from "../utils/storage";

export default function FundGoalModal({ selectedGoal, onClose }) {
  const [fundAmount, setFundAmount] = useState("");

  const handleFundSubmit = (e) => {
    e.preventDefault();
    if (!fundAmount || !selectedGoal) return;
    
    // Confetti logic
    const oldCurrent = selectedGoal.current;
    const newCurrent = oldCurrent + parseFloat(fundAmount);
    if (newCurrent >= selectedGoal.target && oldCurrent < selectedGoal.target) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#10b981', '#3b82f6', '#ffffff'] // cyan, emerald, blue, white
      });
    }

    addFundsToGoal(selectedGoal.id, fundAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888] hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4">Add Funds to {selectedGoal.title}</h3>
        <form onSubmit={handleFundSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#888] mb-1">Amount to Add (₹)</label>
            <input 
              type="number" required min="1" step="any" 
              value={fundAmount} 
              onChange={e => setFundAmount(e.target.value)} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" 
              placeholder="5000" 
            />
            <p className="text-[10px] text-[#555] mt-1">This will deduct from your actual balance by instantly recording a unique saving transaction.</p>
          </div>
          <button type="submit" className="w-full bg-cyan-400 text-black font-semibold rounded-lg py-2 mt-4 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            Deposit Funds
          </button>
        </form>
      </div>
    </div>
  );
}
