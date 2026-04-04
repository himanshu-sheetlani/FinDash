import React from "react";

function InvestmentStarterPicks({
  loading,
  savedSymbolsCount,
  stocks,
  onAddSymbol,
}) {
  if (savedSymbolsCount > 0 || loading) {
    return null;
  }

  return (
    <div className="mb-10 bg-[#161616] border border-dashed border-[#333] rounded-2xl p-8 text-center flex flex-col items-center">
      <p className="text-white text-lg font-medium mb-2">Build Your Portfolio</p>
      <p className="text-[#888] text-sm mb-6 max-w-md">
        Search for a company using the bar above, or quickly start tracking any
        of these famous industry giants perfectly integrated with Finnhub.
      </p>

      <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
        {stocks.map((stock) => (
          <button
            key={stock.sym}
            onClick={() => onAddSymbol(stock.sym)}
            className="bg-[#1a1a1a] border border-[#333] hover:border-cyan-400 hover:text-cyan-400 text-white font-medium py-2.5 px-5 rounded-full text-sm transition-colors flex items-center gap-2 group"
          >
            <span>{stock.name}</span>
            <span className="text-[10px] bg-[#222] group-hover:bg-cyan-400/10 group-hover:text-cyan-400 px-2 py-0.5 rounded-md text-[#888] transition-colors">
              {stock.sym}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InvestmentStarterPicks;
