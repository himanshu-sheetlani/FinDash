import React, { useState, useEffect } from "react";
import { ChevronDown, Info, Heart } from "lucide-react";
import { getCalculatedBalance } from "../utils/storage";

function BalanceCard() {
  const [balance, setBalance] = useState(0);

  const formatBalance = (amount) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat("en-IN").format(absAmount);
    return `${isNegative ? "-" : ""}₹${formatted}`;
  };

  useEffect(() => {
    const fetchBalance = () => {
      setBalance(getCalculatedBalance());
    };
    fetchBalance();
    window.addEventListener('transactions_updated', fetchBalance);
    return () => window.removeEventListener('transactions_updated', fetchBalance);
  }, []);
  return (
    <div className="md:col-span-4 bg-[#161616] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-sm font-semibold text-white">Your Balance</h2>
        <button className="text-xs text-[#888] flex items-center hover:text-white transition-colors">
          Indian Rupee <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
      <hr className="border-[#333] mb-4" />
      <div className="mb-4 relative z-10">
        <p className="text-xs text-[#888] mb-1">Balance</p>
        <div className="flex justify-between items-end">
          <h1
            className={`text-4xl font-light tracking-tight font-semibold ${
              balance < 0 ? "text-red-400" : "text-white"
            }`}
          >
            {formatBalance(balance)}
          </h1>
          <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center border border-[#333]">
            <Info className="w-4 h-4 text-cyan-200" />
          </div>
        </div>
      </div>
      {/* <p className="text-xs text-[#888] mb-6 relative z-10">Compared to last month <span className="text-green-400 font-medium">+24.17%</span></p> */}
      <hr className="border-[#333] mb-4" />
      <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 mb-3 border border-[#2a2a2a]">
        <div className="flex items-center justify-between m-1">
          <div className="flex items-center">
            <div>
              <p className="text-md text-white font-medium">Credit Score</p>
              <p className="text-[10px] text-green-400">+10</p>
            </div>
          </div>
          <p className="text-lg font-medium text-white">650</p>
        </div>
      </div>
      <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 mb-3 border border-[#2a2a2a]">
        {/* <p className="text-xs text-[#888] mb-1">Savings</p>
          <p className="text-lg font-medium text-white">₹1,35,000</p>
          <p className="text-xs text-green-400 mb-1">+7% Intrest</p> */}
        <div className="flex items-center justify-between m-1">
          <div className="flex items-center">
            <div>
              <p className="text-md text-white font-medium">Savings</p>
              <p className="text-[10px] text-green-400">+7% Intrest</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-md font-medium text-[#555] line-through">
              ₹12,500
            </p>
            <p className="text-lg font-medium text-white">₹13,375</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a]">
        <div className="flex items-center justify-between m-1">
          <div className="flex items-center">
            <div>
              <p className="text-md text-white font-medium">Investment</p>
              <p className="text-[10px] text-green-400">+17% Intrest</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-md font-medium text-[#555] line-through">
              ₹20,000
            </p>
            <p className="text-lg font-medium text-white">₹23,400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
