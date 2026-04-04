import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp, Home, Car, Plane, Laptop, Book, Heart } from 'lucide-react';
import { getGoals, formatAbsoluteCurrency } from '../utils/storage';

const ICON_MAP = {
  TrendingUp: <TrendingUp className="w-4 h-4 text-cyan-200" />,
  Home: <Home className="w-4 h-4 text-cyan-200" />,
  Car: <Car className="w-4 h-4 text-cyan-200" />,
  Plane: <Plane className="w-4 h-4 text-cyan-200" />,
  Laptop: <Laptop className="w-4 h-4 text-cyan-200" />,
  Book: <Book className="w-4 h-4 text-cyan-200" />,
  Heart: <Heart className="w-4 h-4 text-cyan-200" />
};

function GoalsCard() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = () => {
      setGoals(getGoals());
    };
    fetchGoals();
    window.addEventListener('goals_updated', fetchGoals);
    return () => window.removeEventListener('goals_updated', fetchGoals);
  }, []);

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
        {goals.slice(0, 3).map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const GoalIcon = ICON_MAP[goal.icon] || ICON_MAP.TrendingUp;
          return (
            <div key={goal.id} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center mr-3">
                    {GoalIcon}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{goal.title}</p>
                    <p className="text-[10px] text-[#888]">{percent}% Achieved</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{formatAbsoluteCurrency(goal.current)}</p>
                  <p className="text-[9px] text-[#888]">of {formatAbsoluteCurrency(goal.target)}</p>
                </div>
              </div>
              <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${percent >= 100 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.6)]'}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
          <p className="text-[#888] text-xs text-center py-4">No goals created yet.</p>
        )}
      </div>
    </div>
  );
}

export default GoalsCard;
