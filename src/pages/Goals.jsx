import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getGoals } from "../utils/storage";

// Components
import CreateGoalModal from "../components/CreateGoalModal";
import FundGoalModal from "../components/FundGoalModal";
import GoalItemCard from "../components/GoalItemCard";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fundModalGoal, setFundModalGoal] = useState(null);

  useEffect(() => {
    const fetchGoals = () => setGoals(getGoals());
    fetchGoals();
    window.addEventListener('goals_updated', fetchGoals);
    return () => window.removeEventListener('goals_updated', fetchGoals);
  }, []);

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

      {/* MODALS */}
      {showCreateModal && <CreateGoalModal onClose={() => setShowCreateModal(false)} />}
      {fundModalGoal && <FundGoalModal selectedGoal={fundModalGoal} onClose={() => setFundModalGoal(null)} />}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <GoalItemCard 
            key={goal.id} 
            goal={goal} 
            openFundModal={() => setFundModalGoal(goal)} 
          />
        ))}

        {/* Empty State / Create Box */}
        <div 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#1a1a1a] border border-dashed border-[#333] hover:border-[#555] rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[220px] group"
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
