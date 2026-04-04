import React, { useState, useEffect } from "react";
import InvestmentHeader from "../components/investment/InvestmentHeader";
import InvestmentSearchPanel from "../components/investment/InvestmentSearchPanel";
import InvestmentStarterPicks from "../components/investment/InvestmentStarterPicks";
import InvestmentStockGrid from "../components/investment/InvestmentStockGrid";

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
      <InvestmentHeader
        loading={loading}
        onRefresh={() => fetchStockData(savedSymbols, true)}
      />

      <InvestmentSearchPanel
        apiKey={apiKey}
        isSearching={isSearching}
        savedSymbols={savedSymbols}
        searchQuery={searchQuery}
        searchResults={searchResults}
        onQueryChange={setSearchQuery}
        onSearch={executeSearch}
        onAddSymbol={addConfirmedSymbol}
        onClearResults={() => setSearchResults([])}
      />

      <InvestmentStarterPicks
        loading={loading}
        savedSymbolsCount={savedSymbols.length}
        stocks={FAMOUS_STOCKS}
        onAddSymbol={addConfirmedSymbol}
      />

      <InvestmentStockGrid
        stocks={stocks}
        onRemoveSymbol={removeSymbol}
      />
    </>
  );
}

export default Investment;
