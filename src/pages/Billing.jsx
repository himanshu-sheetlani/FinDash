import React from 'react';
import { CreditCard } from 'lucide-react';

function Billing() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
      <div className="w-20 h-20 bg-[#161616] border border-[#333] rounded-2xl flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/[0.1] to-transparent"></div>
        <CreditCard className="w-8 h-8 text-cyan-200 relative z-10" />
      </div>
      <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Billing & Payments</h1>
      <p className="text-[#888] text-center max-w-md">
        We're currently working hard to bring you a comprehensive billing and payment suite. Coming soon!
      </p>
    </div>
  );
}

export default Billing;
