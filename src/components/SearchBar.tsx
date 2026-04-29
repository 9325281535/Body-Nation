"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// A mini-database for our search to query against
const searchDatabase = [
  { id: 1, name: "Gold Standard 100% Whey", brand: "Optimum Nutrition", type: "Whey Protein", img: "/Whey_protein.png", price: 6499 },
  { id: 2, name: "Nitro-Tech Whey Gold", brand: "MuscleTech", type: "Whey Protein", img: "/whey.png", price: 5299 },
  { id: 13, name: "Micronized Creatine Powder", brand: "Optimum Nutrition", type: "Creatine", img: "/creatine.jpg", price: 999 },
  { id: 23, name: "High Protein Peanut Butter", brand: "Pintola", type: "Peanut Butter", img: "/peanut_butter.jpg", price: 699 },
  { id: 32, name: "Xtend BCAA Powder", brand: "Scivation", type: "BCAA", img: "/whey.png", price: 2199 },
  { id: 36, name: "Max Protein Daily Bar", brand: "RiteBite", type: "Protein Bars", img: "/max_protein.jpg", price: 720 },
];

const popularSearches = ["Whey Protein", "Creatine Monohydrate", "Optimum Nutrition", "Peanut Butter"];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce logic: Wait 300ms after the user stops typing to update the actual search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products based on query
  const searchResults = searchDatabase.filter((item) => {
    const searchStr = debouncedQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchStr) ||
      item.brand.toLowerCase().includes(searchStr) ||
      item.type.toLowerCase().includes(searchStr)
    );
  });

  // Helper to highlight matched text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-200 text-darkgray font-bold rounded-sm px-0.5">{part}</span> : part
    );
  };

  return (
    <div className="relative flex items-center" ref={searchRef}>
      
      {/* ALWAYS EXPANDED Search Input Box */}
      {/* w-[140px] for tiny phones, scaling up to w-80 for desktop */}
      <div className="flex items-center w-[140px] sm:w-48 md:w-64 lg:w-80 transition-all duration-300">
        <div className={`relative flex items-center w-full rounded-full transition-colors border ${isOpen ? "bg-white border-gray-200 shadow-sm" : "bg-gray-100 border-transparent hover:bg-gray-200"}`}>
          <Search 
            className={`w-4 h-4 md:w-5 md:h-5 ml-3 shrink-0 transition-colors ${isOpen ? "text-bodyblue" : "text-gray-400"}`} 
          />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="bg-transparent border-none outline-none py-2 px-2 md:px-3 text-xs md:text-sm text-darkgray w-full placeholder-gray-400"
          />
          {query && (
            <X 
              onClick={() => {
                setQuery("");
                searchRef.current?.querySelector('input')?.focus(); // Keep focus after clearing
              }}
              className="w-4 h-4 text-gray-400 cursor-pointer mr-3 hover:text-red-500 shrink-0" 
            />
          )}
        </div>
      </div>

      {/* Search Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 md:left-0 w-[300px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Empty State / Default Suggestions */}
            {!debouncedQuery ? (
              <div className="p-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button 
                      key={term} 
                      onClick={() => {
                        setQuery(term);
                        searchRef.current?.querySelector('input')?.focus();
                      }}
                      className="bg-gray-50 hover:bg-bodyblue/10 hover:text-bodyblue text-gray-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border border-gray-100"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Actual Search Results */
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 pt-2">Products</h4>
                    {searchResults.map((item) => (
                      <Link href={`/product/${item.id}`} key={item.id} onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                          <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center relative p-1 shrink-0">
                            <Image src={item.img} alt={item.name} fill sizes="48px" className="object-contain p-1 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-bold text-darkgray line-clamp-1">{highlightText(item.name, debouncedQuery)}</p>
                            <p className="text-xs text-gray-500">{highlightText(item.brand, debouncedQuery)} • {item.type}</p>
                          </div>
                          <div className="font-black text-bodyblue text-sm shrink-0 pr-2">
                            ₹{item.price}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* No Results Found */
                  <div className="p-8 text-center flex flex-col items-center">
                    <Package className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-darkgray font-bold">No results found for "{debouncedQuery}"</p>
                    <p className="text-gray-500 text-sm mt-1">Try checking your spelling or using more general terms.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Footer of dropdown */}
            {debouncedQuery && searchResults.length > 0 && (
              <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
                <Link href="/shop" onClick={() => setIsOpen(false)} className="text-sm font-bold text-bodyblue hover:text-blue-700">
                  See all {searchResults.length} results →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}