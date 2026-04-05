import React, { useMemo, useRef, useState, useEffect } from "react";
import { Download, Plus, X } from "lucide-react";
import { getTransactions, addTransaction } from "../utils/storage";
import OverviewCharts from "../components/OverviewCharts";
import TransactionList from "../components/TransactionList";
import gsap from "gsap";
import useMotionSafeLayoutEffect from "../hooks/useMotionSafeLayoutEffect";

function Transaction() {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    sortBy: "date_desc",
  });
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

  const handleExportTransactions = () => {
    if (filteredTransactions.length === 0) {
      return;
    }

    const escapeCsvValue = (value) => {
      const stringValue = String(value ?? "");
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const csvRows = [
      ["Title", "Category", "Date", "Type", "Amount"],
      ...filteredTransactions.map((transaction) => [
        transaction.title,
        transaction.category,
        transaction.date,
        transaction.amount >= 0 ? "Income" : "Expense",
        transaction.amount,
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const exportDate = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `transactions-${exportDate}.csv`;
    link.click();

    URL.revokeObjectURL(url);
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

  const availableCategories = useMemo(() => {
    return Array.from(new Set(transactions.map((transaction) => transaction.category)));
  }, [transactions]);

  const parseTransactionDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesType =
        filters.type === "all" ||
        (filters.type === "income" && transaction.amount >= 0) ||
        (filters.type === "expense" && transaction.amount < 0);

      const matchesCategory =
        filters.category === "all" || transaction.category === filters.category;

      return matchesType && matchesCategory;
    })
    .sort((first, second) => {
      switch (filters.sortBy) {
        case "date_asc":
          return parseTransactionDate(first.date) - parseTransactionDate(second.date);
        case "amount_desc":
          return Math.abs(second.amount) - Math.abs(first.amount);
        case "amount_asc":
          return Math.abs(first.amount) - Math.abs(second.amount);
        case "title_asc":
          return first.title.localeCompare(second.title);
        case "title_desc":
          return second.title.localeCompare(first.title);
        case "date_desc":
        default:
          return parseTransactionDate(second.date) - parseTransactionDate(first.date);
      }
    });

  useMotionSafeLayoutEffect(pageRef, () => {
    gsap.fromTo(
      ".transaction-animate",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
      }
    );
  }, [activeTab, filteredTransactions.length]);

  useMotionSafeLayoutEffect(pageRef, () => {
    if (!showAddModal) {
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(
        ".transaction-modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      )
      .fromTo(
        ".transaction-modal-panel",
        { y: 28, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35 },
        "-=0.1"
      )
      .fromTo(
        ".transaction-modal-panel form > *",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, stagger: 0.04 },
        "-=0.18"
      );
  }, [showAddModal]);

  return (
    <div ref={pageRef}>
      <header className="transaction-animate mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Transactions
          </h2>
          <p className="text-[#888] mt-1 text-sm">
            A complete history of your transactions.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportTransactions}
            disabled={activeTab !== "transactions" || filteredTransactions.length === 0}
            className="flex items-center justify-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </header>

      {showAddModal && (
        <div className="transaction-modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="transaction-modal-panel bg-[#161616] border border-[#333] rounded-2xl w-full max-w-md p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">Add Transaction</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#888] mb-1">Description</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444] placeholder-[#666]" placeholder="e.g. Netflix" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="transaction-animate flex gap-2 mb-6 p-1 bg-[#161616] border border-[#222] rounded-xl w-full sm:w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none ${activeTab === "transactions" ? "bg-[#222] text-white shadow-[0_0_8px_rgba(255,255,255,0.05)]" : "text-[#888] hover:text-[#bbb]"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none ${activeTab === "categories" ? "bg-[#222] text-white shadow-[0_0_8px_rgba(255,255,255,0.05)]" : "text-[#888] hover:text-[#bbb]"}`}
        >
          Overview
        </button>
      </div>

      {activeTab === "transactions" ? (
        <>
          <div className="transaction-animate mb-6 bg-[#161616] border border-[#222] rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="block text-xs text-[#888] mb-1">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((current) => ({ ...current, type: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]"
                >
                  <option value="all">All types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#888] mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((current) => ({
                      ...current,
                      category: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]"
                >
                  <option value="all">All categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#888] mb-1">Sort by</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((current) => ({
                      ...current,
                      sortBy: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#444]"
                >
                  <option value="date_desc">Newest first</option>
                  <option value="date_asc">Oldest first</option>
                  <option value="amount_desc">Highest amount</option>
                  <option value="amount_asc">Lowest amount</option>
                  <option value="title_asc">Title A-Z</option>
                  <option value="title_desc">Title Z-A</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setFilters({
                  type: "all",
                  category: "all",
                  sortBy: "date_desc",
                })
              }
              className="text-sm text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors w-full lg:w-auto"
            >
              Reset
            </button>
          </div>

          <div className="transaction-animate">
            <TransactionList transactions={filteredTransactions} />
          </div>
        </>
      ) : (
        <div className="transaction-animate">
          <OverviewCharts transactions={transactions} />
        </div>
      )}
    </div>
  );
}

export default Transaction;
