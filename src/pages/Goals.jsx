import React, { useState, useEffect } from "react";
import { Plus, X, ArrowUpRight, TrendingUp, Home, Car, Plane, Laptop, Book, Heart, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

const ICON_MAP = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Book: <Book className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />
};
import { getGoals, addGoal, addFundsToGoal, removeGoal, formatAbsoluteCurrency } from "../utils/storage";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [createData, setCreateData] = useState({ title: "", target: "", icon: "" });
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    const fetchGoals = () => setGoals(getGoals());
    fetchGoals();
    window.addEventListener('goals_updated', fetchGoals);
    return () => window.removeEventListener('goals_updated', fetchGoals);
  }, []);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createData.title || !createData.target) return;
    addGoal({ title: createData.title, target: parseFloat(createData.target), icon: createData.icon });
    setShowCreateModal(false);
    setCreateData({ title: "", target: "", icon: "TrendingUp" });
  };

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
    setShowFundModal(false);
    setFundAmount("");
    setSelectedGoal(null);
  };

  const openFundModal = (goal) => {
    setSelectedGoal(goal);
    setShowFundModal(true);
  };

  return (
    <>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Goals</h2>
          <p className="text-[#888] mt-1 text-sm">Milestones for your wealth accumulation.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Goal
        </button>
      </header>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-sm p-6 relative">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">New Objective</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#888] mb-1">Goal Title</label>
                <input type="text" required value={createData.title} onChange={e => setCreateData({...createData, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="e.g. Dream House" />
              </div>
              <div>
                <label className="block text-xs text-[#888] mb-1">Target Amount (₹)</label>
                <input type="number" required min="1" step="any" value={createData.target} onChange={e => setCreateData({...createData, target: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="1000000" />
              </div>
              <div>
                <label className="block text-xs text-[#888] mb-2">Select Icon</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(ICON_MAP).map(key => (
                    <button 
                      type="button" 
                      key={key}
                      onClick={() => setCreateData({...createData, icon: key})}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${createData.icon === key ? 'bg-[#222] border-cyan-400 text-cyan-400' : 'bg-[#1a1a1a] border-[#333] text-[#888] hover:border-[#555] hover:text-white'}`}
                    >
                      {React.cloneElement(ICON_MAP[key], { className: "w-4 h-4" })}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-white text-black font-semibold rounded-lg py-2 mt-4 hover:bg-[#e0e0e0] transition-colors">
                Save Goal
              </button>
            </form>
          </div>
        </div>
      )}

      {showFundModal && selectedGoal && (
       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-sm p-6 relative">
            <button onClick={() => {setShowFundModal(false); setSelectedGoal(null);}} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">Add Funds to {selectedGoal.title}</h3>
            <form onSubmit={handleFundSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#888] mb-1">Amount to Add (₹)</label>
                <input type="number" required min="1" step="any" value={fundAmount} onChange={e => setFundAmount(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="5000" />
                <p className="text-[10px] text-[#555] mt-1">This will deduct from your actual balance by instantly recording a unique saving transaction.</p>
              </div>
              <button type="submit" className="w-full bg-cyan-400 text-black font-semibold rounded-lg py-2 mt-4 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Deposit Funds
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goals.map((goal, i) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const isCompleted = percent >= 100;
          const GoalIcon = ICON_MAP[goal.icon] || ICON_MAP.TrendingUp;
          
          return (
            <div key={goal.id || i} className={`bg-[#161616] border ${isCompleted ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.05)]' : 'border-[#222] hover:border-[#333]'} transition-all duration-300 rounded-2xl p-6 relative overflow-hidden group`}>
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
        })}

        <div 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#1a1a1a] border border-dashed border-[#333] hover:border-[#555] rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[220px]"
        >
          <div className="w-10 h-10 rounded-full bg-[#222] text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Plus className="w-5 h-5 text-[#888]" />
          </div>
          <h3 className="text-sm font-medium text-white tracking-wide mb-1">New Objective</h3>
          <p className="text-xs text-[#666]">Define a new financial target</p>
        </div>
      </div>
    </>
  );
}

export default Goals;
