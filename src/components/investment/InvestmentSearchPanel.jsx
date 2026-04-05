import React from "react";
import { Check, Search, X } from "lucide-react";

function InvestmentSearchPanel({
  apiKey,
  isSearching,
  savedSymbols,
  searchQuery,
  searchResults,
  onQueryChange,
  onSearch,
  onAddSymbol,
  onClearResults,
}) {
  return (
    <div className="bg-[#161616] border border-[#222] rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row justify-end md:items-center shadow-lg gap-4 sm:gap-6">
      <div className="relative z-20 w-full md:w-auto">
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search Ticker (e.g. Apple)"
              className="pl-9 pr-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 w-full sm:w-full md:w-64 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !apiKey}
            className="bg-[#222] border border-[#333] hover:border-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            {isSearching ? "..." : "Search"}
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="absolute top-full right-0 left-0 mt-2 bg-[#161616] border border-[#333] rounded-xl shadow-2xl overflow-hidden py-1 max-w-full">
            <div className="flex justify-between items-center px-4 py-2 bg-[#111] border-b border-[#222]">
              <span className="text-[10px] text-[#888] font-semibold uppercase tracking-wider">
                Top Matches
              </span>
              <button
                onClick={onClearResults}
                className="text-[#555] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {searchResults.map((result) => {
                const isAdded = savedSymbols.includes(result.symbol);

                return (
                  <button
                    key={result.symbol}
                    onClick={() => !isAdded && onAddSymbol(result.symbol)}
                    disabled={isAdded}
                    className={`w-full text-left px-4 py-3 flex justify-between items-center gap-3 border-b border-[#222] last:border-0 ${
                      isAdded
                        ? "opacity-50 cursor-default"
                        : "hover:bg-[#222] cursor-pointer"
                    }`}
                  >
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      {result.symbol}
                      {isAdded && (
                        <Check className="w-3 h-3 text-emerald-400" />
                      )}
                    </span>
                    <span className="text-[#888] text-xs truncate max-w-[120px] sm:max-w-[160px] md:max-w-[180px]">
                      {result.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentSearchPanel;
