import React, { useState, useEffect } from "react";
import TransactionBadge from "../components/TransactionBadge";
import { ArrowUpRight, ArrowDownLeft, Plus, X } from "lucide-react";
import { getTransactions, addTransaction, formatCurrency } from "../utils/storage";
import OverviewCharts from "../components/OverviewCharts";

function Transaction() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Essentials",
    date: ""
  });

  useEffect(() => {
    const fetchTx = () => {
      setTransactions(getTransactions());
    };
    fetchTx();
    window.addEventListener('transactions_updated', fetchTx);
    return () => window.removeEventListener('transactions_updated', fetchTx);
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) return;
    
    let finalAmount = parseFloat(formData.amount);
    if (formData.type === 'expense') finalAmount = -Math.abs(finalAmount);
    else finalAmount = Math.abs(finalAmount);

    addTransaction({
      title: formData.title,
      amount: finalAmount,
      category: formData.category,
      date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    
    setShowAddModal(false);
    setFormData({ title: "", amount: "", type: "expense", category: "Essentials", date: "" });
  };

  const budgets = {
    "Essentials": { limit: 10000, color: "bg-blue-400" },
    "Wants": { limit: 3000, color: "bg-pink-400" },
    "Learning": { limit: 2000, color: "bg-purple-400" },
    "Saving": { limit: 5000, color: "bg-yellow-400" },
    "Dept": { limit: 5000, color: "bg-red-400" }
  };

  const categoryTotals = transactions.reduce((acc, tx) => {
    if (tx.amount < 0 && tx.category !== 'Recieved') {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    }
    return acc;
  }, {});

  const categorySpending = Object.keys(budgets).map(cat => ({
    category: cat,
    amount: categoryTotals[cat] || 0,
    budget: budgets[cat].limit,
    color: budgets[cat].color
  }));

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Transactions
          </h2>
          <p className="text-[#888] mt-1 text-sm">
            A complete history of your transactions.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </header>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">Add Transaction</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#888] mb-1">Description</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="e.g. Netflix" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#888] mb-1">Amount (₹)</label>
                  <input type="number" required min="1" step="any" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]">
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#888] mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]">
                    <option value="Essentials">Essentials</option>
                    <option value="Wants">Wants</option>
                    <option value="Learning">Learning</option>
                    <option value="Saving">Saving</option>
                    <option value="Dept">Dept</option>
                    <option value="Recieved">Recieved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]" />
                </div>
              </div>
              <button type="submit" className="w-full bg-white text-black font-semibold rounded-lg py-2 mt-4 hover:bg-[#e0e0e0] transition-colors">
                Save 
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 p-1 bg-[#161616] border border-[#222] rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "transactions" ? "bg-[#222] text-white shadow-[0_0_8px_rgba(255,255,255,0.05)]" : "text-[#888] hover:text-[#bbb]"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "categories" ? "bg-[#222] text-white shadow-[0_0_8px_rgba(255,255,255,0.05)]" : "text-[#888] hover:text-[#bbb]"}`}
        >
          Overview
        </button>
      </div>

      {activeTab === "transactions" ? (
        <div className="bg-[#161616] rounded-2xl border border-[#222] overflow-hidden p-6 md:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="py-3 text-[12px] font-semibold text-white uppercase tracking-wider pl-4">Merchant</th>
                  <th className="py-3 text-[12px] font-semibold text-white uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="py-3 text-[12px] font-semibold text-white uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="py-3 text-[12px] font-semibold text-white uppercase tracking-wider pr-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <td className="py-4 pl-4 flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] group-hover:border-[#444] flex items-center justify-center mr-4 transition-colors">
                        {t.amount >= 0 ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{t.title}</p>
                        <p className="text-xs text-[#888] sm:hidden mt-1">
                          {t.date}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 hidden sm:table-cell">
                      <TransactionBadge status={t.category} />
                    </td>
                    <td className="py-4 text-[#888] text-[10px] hidden sm:table-cell">
                      {t.date}
                    </td>
                    <td
                      className={`py-4 pr-4 text-right text-sm font-medium ${t.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <OverviewCharts transactions={transactions} />
      )}
    </>
  );
}

export default Transaction;
