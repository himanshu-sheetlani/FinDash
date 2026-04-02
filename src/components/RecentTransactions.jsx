import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownLeft, ArrowBigRight } from 'lucide-react';

function RecentTransactions() {
  const transactions = [
    { id: 1, type: 'Company', desc: 'Sent • Aug 24, 2024', amount: '₹1.500,00', curr: '₹1,371.83 INR', status: 'Waiting', method: 'Credit Card', methodDesc: '**** 3560' },
    { id: 2, type: 'Vera K.', desc: 'Receive • Aug 18, 2024', amount: '₹800,00', curr: '₹731.64 INR', status: 'Success', method: 'Bank Transfer', methodDesc: '**** 4275' },
    { id: 3, type: 'Birthday', desc: 'Sent • Aug 8, 2024', amount: '₹240,00', curr: '₹219.49 INR', status: 'Due Date', method: 'Credit Card', methodDesc: '**** 9052' },
    { id: 4, type: 'Rifqy A.', desc: 'Receive • Aug 2, 2024', amount: '₹240,00', curr: '₹219.49 INR', status: 'Disabled', method: 'Bank Transfer', methodDesc: '**** 2093' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Waiting': return 'text-[#ffbe90] border-[#5a4a3a] bg-[#3a2d22]'; 
      case 'Success': return 'text-green-400 border-green-900/50 bg-green-900/20';
      case 'Due Date': return 'text-red-400 border-red-900/50 bg-red-900/20';
      default: return 'text-gray-400 border-gray-700 bg-gray-800';
    }
  };

  return (
    <div className="md:col-span-8 bg-[#161616] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
        <button className="text-xs text-white border border-[#333] hover:bg-[#222] px-3 py-1.5 rounded-lg flex items-center transition-colors">
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
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Status</th>
              <th className="py-3 text-[10px] font-semibold text-[#666] uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-[#1a1a1a] transition-colors group">
                <td className="py-4 flex items-center pr-4">
                  <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] group-hover:border-[#444] flex items-center justify-center mr-4 transition-colors">
                    {t.desc.includes('Receive') ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.type}</p>
                    <p className="text-xs text-[#888]">{t.desc}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <p className={`text-sm font-medium ${t.desc.includes('Receive') ? 'text-green-400' : 'text-red-400'}`}>
                    {t.desc.includes('Receive') ? '+' : '-'}{t.amount}
                  </p>
                  <p className="text-[10px] text-[#888]">{t.curr}</p>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-flex px-2 py-0.5 border text-[10px] font-medium rounded-full ${getStatusColor(t.status)}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-4">
                  <p className="text-sm text-white">{t.method}</p>
                  <p className="text-xs text-[#888]">{t.methodDesc}</p>
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
