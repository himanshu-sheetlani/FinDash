import React from "react";
import { RefreshCw } from "lucide-react";

function InvestmentHeader({ loading, onRefresh }) {
  return (
    <header className="mb-12 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-semibold text-white tracking-tight">
          Investment
        </h2>
        <p className="text-[#888] mt-1 text-sm">
          Real-time market analytics using Finnhub Data.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`flex items-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors ${
            loading ? "opacity-50" : ""
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
    </header>
  );
}

export default InvestmentHeader;
