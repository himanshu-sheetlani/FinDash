import React, { useState, useEffect } from "react";
import TransactionBadge from "../components/TransactionBadge";
import { ArrowUpRight, ArrowDownLeft, Plus, X } from "lucide-react";
import { getTransactions, addTransaction, formatCurrency } from "../utils/storage";

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
          <p className="text-zinc-500 mt-1 text-sm">
            A complete history of your transactions.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-zinc-100 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </header>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333] rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">Add Transaction</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Description</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-600" placeholder="e.g. Netflix" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Amount (₹)</label>
                  <input type="number" required min="1" step="any" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-600" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-600">
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-600">
                    <option value="Essentials">Essentials</option>
                    <option value="Wants">Wants</option>
                    <option value="Learning">Learning</option>
                    <option value="Saving">Saving</option>
                    <option value="Dept">Dept</option>
                    <option value="Recieved">Recieved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-600" />
                </div>
              </div>
              <button type="submit" className="w-full bg-white text-black font-semibold rounded-lg py-2 mt-4 hover:bg-zinc-200 transition-colors">
                Save 
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 p-1 bg-zinc-950/50 border border-zinc-900 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "transactions" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "categories" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          Category Spending
        </button>
      </div>

      {activeTab === "transactions" ? (
        <div className="bg-black rounded-xl border border-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-900">
                  <th className="font-semibold p-5 pl-8">Merchant</th>
                  <th className="font-semibold p-5 hidden sm:table-cell">
                    Category
                  </th>
                  <th className="font-semibold p-5 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="font-semibold p-5 pr-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-zinc-900/40 transition-colors group"
                  >
                    <td className="p-5 pl-8 flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mr-4 mt-1">
                        {t.amount >= 0 ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.title}</p>
                        <p className="text-xs text-zinc-500 sm:hidden mt-1">
                          {t.date}
                        </p>
                      </div>
                    </td>
                    <td className="p-5 hidden sm:table-cell">
                      <TransactionBadge status={t.category} />
                    </td>
                    <td className="p-5 text-zinc-500 text-sm hidden sm:table-cell">
                      {t.date}
                    </td>
                    <td
                      className={`p-5 pr-8 text-right font-medium ${t.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categorySpending.map((cat) => (
            <div
              key={cat.category}
              className="bg-black border border-zinc-900 p-5 rounded-xl hover:bg-zinc-900/20 transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-medium">{cat.category}</span>
                <span className="text-zinc-400 text-sm">
                  ₹{cat.amount.toLocaleString('en-IN')} /{" "}
                  <span className="text-zinc-500">
                    ₹{cat.budget.toLocaleString('en-IN')}
                  </span>
                </span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div
                  className={`${cat.color} h-full rounded-full shadow-[0_0_8px_currentColor] opacity-80`}
                  style={{
                    width: `${Math.min((cat.amount / cat.budget) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Transaction;
