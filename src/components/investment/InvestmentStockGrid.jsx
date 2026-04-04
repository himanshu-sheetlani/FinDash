import React from "react";
import { TrendingDown, TrendingUp, X } from "lucide-react";

function InvestmentStockGrid({ stocks, onRemoveSymbol }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stocks.map((stock) => {
        const isPositive = stock.change >= 0;

        return (
          <div
            key={stock.symbol}
            className="bg-[#161616] border border-[#222] hover:border-[#333] transition-colors rounded-2xl p-6 relative group transform hover:-translate-y-1 duration-300"
          >
            <button
              onClick={() => onRemoveSymbol(stock.symbol)}
              className="absolute top-4 right-4 text-[#555] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {stock.symbol}
                </h3>
              </div>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1 font-semibold">
                  Live Price
                </p>
                <p className="text-2xl font-light text-white">
                  ${stock.price.toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-medium flex items-center justify-end gap-1 ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InvestmentStockGrid;
