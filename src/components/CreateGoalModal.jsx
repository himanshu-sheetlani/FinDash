import React, { useState } from "react";
import { X, TrendingUp, Home, Car, Plane, Laptop, Book, Heart } from "lucide-react";
import { addGoal } from "../utils/storage";

export const ICON_MAP = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Book: <Book className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />
};

export default function CreateGoalModal({ onClose }) {
  const [createData, setCreateData] = useState({ title: "", target: "", icon: "TrendingUp" });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createData.title || !createData.target) return;
    addGoal({ title: createData.title, target: parseFloat(createData.target), icon: createData.icon });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888] hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4">New Objective</h3>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#888] mb-1">Goal Title</label>
            <input 
              type="text" required 
              value={createData.title} 
              onChange={e => setCreateData({...createData, title: e.target.value})} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" 
              placeholder="e.g. Dream House" 
            />
          </div>
          <div>
            <label className="block text-xs text-[#888] mb-1">Target Amount (₹)</label>
            <input 
              type="number" required min="1" step="any" 
              value={createData.target} 
              onChange={e => setCreateData({...createData, target: e.target.value})} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" 
              placeholder="1000000" 
            />
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
  );
}
