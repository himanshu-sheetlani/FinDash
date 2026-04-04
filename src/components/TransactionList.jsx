import React from "react";
import TransactionBadge from "./TransactionBadge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatCurrency } from "../utils/storage";

export default function TransactionList({ transactions }) {
  return (
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
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-sm text-[#888]"
                >
                  No transactions match the selected filters.
                </td>
              </tr>
            )}
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
  );
}
