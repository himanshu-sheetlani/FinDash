import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, ArrowDownLeft, ArrowBigRight } from 'lucide-react';
import TransactionBadge from './TransactionBadge';
import { getTransactions, formatAbsoluteCurrency } from '../utils/storage';

function RecentTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTx = () => {
      setTransactions(getTransactions().slice(0, 4));
    };
    fetchTx();
    window.addEventListener('transactions_updated', fetchTx);
    return () => window.removeEventListener('transactions_updated', fetchTx);
  }, []);

  return (
    <div className="md:col-span-8 bg-[#161616] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
        <button className="text-xs text-white border border-[#333] hover:bg-[#222] px-3 py-1.5 rounded-lg flex items-center transition-colors" onClick={() => navigate('/transaction')}>
          View All
          <ChevronRight className="w-3 h-3 ml-1.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#222]">
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Type</th>
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Amount</th>
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Category</th>
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-[#1a1a1a] transition-colors group">
                <td className="py-4 flex items-center pr-4">
                  <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] group-hover:border-[#444] flex items-center justify-center mr-4 transition-colors">
                    {t.amount >= 0 ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.title}</p>
                    <p className="text-xs text-[#888]">{t.amount >= 0 ? 'Receive' : 'Sent'} • {t.date}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <p className={`text-sm font-medium ${t.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {t.amount >= 0 ? '+' : '-'}{formatAbsoluteCurrency(t.amount)}
                  </p>
                  <p className="text-[10px] text-[#888]">₹34,000 INR</p>
                </td>
                <td className="py-4 px-2">
                  <TransactionBadge status={t.category} />
                </td>
                <td className="py-4">
                  <p className="text-sm text-white">Bank Transfer</p>
                  <p className="text-xs text-[#888]">**** 9052</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
