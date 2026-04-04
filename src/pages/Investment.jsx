import React, { useState, useEffect } from "react";
import { Plus, X, Search, RefreshCw, TrendingUp, TrendingDown, Check } from "lucide-react";

const memoryCache = {};

function Investment() {
  const apiKey = import.meta.env.VITE_FINNHUB_KEY || "";

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const FAMOUS_STOCKS = [
    { sym: "AAPL", name: "Apple" },
    { sym: "NVDA", name: "NVIDIA" },
    { sym: "GOOGL", name: "Google" },
    { sym: "MSFT", name: "Microsoft" },
    { sym: "AMZN", name: "Amazon" },
    { sym: "TSLA", name: "Tesla" },
    { sym: "META", name: "Meta" },
    { sym: "NFLX", name: "Netflix" },
    { sym: "AMD", name: "AMD" }
  ];

  const [savedSymbols, setSavedSymbols] = useState([]);

  useEffect(() => {
    if (apiKey && savedSymbols.length > 0) {
      fetchStockData(savedSymbols);
    } else if (savedSymbols.length === 0) {
      setStocks([]);
    }
  }, [apiKey, savedSymbols]);

  const fetchStockData = async (symbolsToFetch, forceRefresh = false) => {
    setLoading(true);
    const newStocks = [];
    let cacheMap = memoryCache;
    const CACHE_LIFETIME = 60 * 60 * 1000; 

    for (const sym of symbolsToFetch) {
      const now = Date.now();
      const cachedData = cacheMap[sym];

      if (!forceRefresh && cachedData && (now - cachedData.timestamp < CACHE_LIFETIME)) {
        newStocks.push(cachedData.data);
      } else {
        try {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${apiKey}`);
          const raw = await res.json();

          if (!raw.error && raw.c !== undefined && raw.c !== 0) {
            const data = {
              symbol: sym,
              price: parseFloat(raw.c),
              change: parseFloat(raw.d),
              changePercent: parseFloat(raw.dp)
            };
            cacheMap[sym] = { data, timestamp: now };
            newStocks.push(data);
          } else {
             console.warn("Finnhub Error / Invalid Symbol:", raw);
             if (cachedData) newStocks.push(cachedData.data);
          }
        } catch (e) {
          console.error("Failed to fetch stock:", sym, e);
          if (cachedData) newStocks.push(cachedData.data);
        }
      }
    }
    
    
    setStocks(newStocks);
    setLoading(false);
  };



  const executeSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !apiKey) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://finnhub.io/api/v1/search?q=${searchQuery}&token=${apiKey}`);
      const raw = await res.json();
      setSearchResults(raw.result ? raw.result.filter(s => s.type === "Common Stock" || s.type === "ADR").slice(0, 6) : []);
    } catch (e) {
      console.error("Search failed", e);
    }
    setIsSearching(false);
  };

  const addConfirmedSymbol = (sym) => {
    const symbolClean = sym.toUpperCase().trim();
    if (!symbolClean || savedSymbols.includes(symbolClean)) return;
    setSavedSymbols([...savedSymbols, symbolClean]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeSymbol = (sym) => {
    setSavedSymbols(savedSymbols.filter(s => s !== sym));
  };



  return (
    <>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Investment</h2>
          <p className="text-[#888] mt-1 text-sm">Real-time market analytics using Finnhub Data.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => fetchStockData(savedSymbols, true)}
            disabled={loading}
            className={`flex items-center gap-2 text-xs text-white border border-[#333] hover:bg-[#222] px-4 py-2 rounded-lg transition-colors ${loading ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-end md:items-center shadow-lg gap-6">
        <div className="relative z-20">
          <form onSubmit={executeSearch} className="flex gap-2">
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Ticker (e.g. Apple)" className="pl-9 pr-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 w-56 md:w-64 transition-colors" />
            </div>
            <button type="submit" disabled={isSearching || !apiKey} className="bg-[#222] border border-[#333] hover:border-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              {isSearching ? "..." : "Search"}
            </button>
          </form>
          
          {searchResults.length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-[#161616] border border-[#333] rounded-xl shadow-2xl overflow-hidden py-1">
              <div className="flex justify-between items-center px-4 py-2 bg-[#111] border-b border-[#222]">
                <span className="text-[10px] text-[#888] font-semibold uppercase tracking-wider">Top Matches</span>
                <button onClick={() => setSearchResults([])} className="text-[#555] hover:text-white"><X className="w-3 h-3" /></button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map(res => {
                  const isAdded = savedSymbols.includes(res.symbol);
                  return (
                    <button 
                      key={res.symbol} 
                      onClick={() => !isAdded && addConfirmedSymbol(res.symbol)}
                      disabled={isAdded}
                      className={`w-full text-left px-4 py-3 flex justify-between items-center border-b border-[#222] last:border-0 ${isAdded ? 'opacity-50 cursor-default' : 'hover:bg-[#222] cursor-pointer'}`}
                    >
                      <span className="font-bold text-white text-sm flex items-center gap-2">
                        {res.symbol} {isAdded && <Check className="w-3 h-3 text-emerald-400" />}
                      </span>
                      <span className="text-[#888] text-xs truncate max-w-[140px] md:max-w-[180px]">{res.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {savedSymbols.length === 0 && !loading && (
        <div className="mb-10 bg-[#161616] border border-dashed border-[#333] rounded-2xl p-8 text-center flex flex-col items-center">
          <p className="text-white text-lg font-medium mb-2">Build Your Portfolio</p>
          <p className="text-[#888] text-sm mb-6 max-w-md">Search for a company using the bar above, or quickly start tracking any of these famous industry giants perfectly integrated with Finnhub.</p>
          
          <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {FAMOUS_STOCKS.map(stk => (
              <button 
                key={stk.sym}
                onClick={() => addConfirmedSymbol(stk.sym)}
                className="bg-[#1a1a1a] border border-[#333] hover:border-cyan-400 hover:text-cyan-400 text-white font-medium py-2.5 px-5 rounded-full text-sm transition-colors flex items-center gap-2 group"
              >
                <span>{stk.name}</span>
                <span className="text-[10px] bg-[#222] group-hover:bg-cyan-400/10 group-hover:text-cyan-400 px-2 py-0.5 rounded-md text-[#888] transition-colors">{stk.sym}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stocks.map((stock) => {
          const isPos = stock.change >= 0;
          return (
            <div key={stock.symbol} className="bg-[#161616] border border-[#222] hover:border-[#333] transition-colors rounded-2xl p-6 relative group transform hover:-translate-y-1 duration-300">
               <button onClick={() => removeSymbol(stock.symbol)} className="absolute top-4 right-4 text-[#555] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"><X className="w-4 h-4" /></button>
               
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{stock.symbol}</h3>
                 </div>
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPos ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {isPos ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                 </div>
               </div>
               
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1 font-semibold">Live Price</p>
                   <p className="text-2xl font-light text-white">${stock.price.toFixed(2)}</p>
                 </div>
                 <div className="text-right">
                   <p className={`text-sm font-medium flex items-center justify-end gap-1 ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                     {isPos ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                   </p>
                 </div>
               </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Investment;
