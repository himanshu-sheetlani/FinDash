import React, { useState } from "react";
import TransactionBadge from "../components/TransactionBadge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

function Transaction() {
  const [activeTab, setActiveTab] = useState("transactions");

  const transactions = [
    { id: 1, desc: "House Rent", date: "Mar 15, 2026", amount: "-₹5,000", category: "Essentials" },
    { id: 2, desc: "Cloths", date: "Mar 10, 2026", amount: "-₹1,000", category: "Wants" },
    { id: 3, desc: "Salary", date: "Mar 8, 2026", amount: "+₹35,000", category: "Recieved" },
    { id: 4, desc: "Novel", date: "Mar 2, 2026", amount: "-₹500", category: "Learning" },
    { id: 5, desc: "Groceries", date: "Feb 28, 2026", amount: "-₹2,500", category: "Essentials" },
    { id: 6, desc: "Gift", date: "Feb 26, 2026", amount: "-₹1,100", category: "Other" },
    { id: 7, desc: "Freelance Client", date: "Feb 25, 2026", amount: "+₹15,000", category: "Recieved" },
    { id: 8, desc: "Emergency Fund", date: "Feb 22, 2026", amount: "-₹5,000", category: "Saving" },
    { id: 9, desc: "Credit Card Bill", date: "Feb 20, 2026", amount: "-₹4,500", category: "Dept" },
    { id: 10, desc: "Movie Tickets", date: "Feb 18, 2026", amount: "-₹800", category: "Wants" },
    { id: 11, desc: "Udemy Subscription", date: "Feb 15, 2026", amount: "-₹1,200", category: "Learning" },
  ];

  const categorySpending = [
    { category: "Essentials", amount: 7500, budget: 10000, color: "bg-blue-400" },
    { category: "Wants", amount: 1800, budget: 3000, color: "bg-pink-400" },
    { category: "Learning", amount: 1700, budget: 2000, color: "bg-purple-400" },
    { category: "Saving", amount: 5000, budget: 5000, color: "bg-yellow-400" },
    { category: "Dept", amount: 4500, budget: 5000, color: "bg-red-400" },
  ];

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
      </header>

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
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mr-4">
                        {t.amount.startsWith("+") ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.desc}</p>
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
                      className={`p-5 pr-8 text-right font-medium ${t.amount.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {t.amount}
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
                  ${cat.amount.toFixed(2)} /{" "}
                  <span className="text-zinc-500">
                    ${cat.budget.toFixed(2)}
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
