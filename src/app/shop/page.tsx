"use client";

import { useState, useMemo } from "react";
import { Filter, X, Search } from "lucide-react";
import ProductCard, { ProductType } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

// Expanded Database with exact categories
const shopProducts: ProductType[] = [
  { id: 1, name: "Gold Standard 100% Whey", brand: "Optimum Nutrition", price: 6499, oldPrice: 8999, rating: 4.8, reviews: 3200, img: "/Whey_protein.png", tag: "Best Seller", category: "Protein", proteinPerScoop: "24g", inStock: true, flavor: "Chocolate" },
  { id: 2, name: "Nitro-Tech Whey Gold", brand: "MuscleTech", price: 5299, rating: 4.6, reviews: 1890, img: "/whey.png", category: "Protein", proteinPerScoop: "24g", inStock: true, flavor: "Vanilla" },
  { id: 13, name: "Micronized Creatine Powder", brand: "Optimum Nutrition", price: 999, rating: 4.8, reviews: 4200, img: "/creatine.jpg", tag: "Essential", category: "Creatine", inStock: true, flavor: "Unflavored" },
  { id: 23, name: "High Protein Peanut Butter", brand: "Pintola", price: 699, rating: 4.8, reviews: 8000, img: "/peanut_butter.jpg", tag: "Top Rated", category: "Peanut Butter", inStock: true, flavor: "Crunchy Chocolate" },
  { id: 18, name: "High Protein Oats (Dark Choco)", brand: "MuscleBlaze", price: 499, rating: 4.5, reviews: 1200, img: "/mb_protein.webp", tag: "Healthy", category: "Oats", inStock: true, flavor: "Dark Chocolate" },
  { id: 28, name: "Serious Mass Gainer", brand: "Optimum Nutrition", price: 3499, rating: 4.6, reviews: 2100, img: "/Whey_protein.png", category: "Supplements", proteinPerScoop: "50g", inStock: true, flavor: "Chocolate" },
  { id: 32, name: "Xtend BCAA Powder", brand: "Scivation", price: 2199, oldPrice: 2999, rating: 4.8, reviews: 5000, img: "/whey.png", tag: "Recovery", category: "Supplements", inStock: true, flavor: "Mango" },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState(""); // <-- NEW SEARCH STATE
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const brands = Array.from(new Set(shopProducts.map(p => p.brand)));
  const categoriesList = ["Protein", "Creatine", "Oats", "Peanut Butter", "Supplements"];

  // Filter Logic: Now includes the Search Query!
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedBrands, selectedCategories, maxPrice, searchQuery]);

  const toggleFilter = (item: string, state: string[], setState: any) => {
    setState(state.includes(item) ? state.filter((i: string) => i !== item) : [...state, item]);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMaxPrice(10000);
    setSearchQuery(""); // Clear search when clearing filters
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-10 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header & Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">SHOP</h1>
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-lg font-bold text-white hover:text-bodygold transition-colors"
          >
            {isMobileFilterOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />} 
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* SIDEBAR: Filters */}
          <div className={`md:w-[280px] shrink-0 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 sticky top-28">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-wider">
                  <Filter className="w-5 h-5 text-bodygold" /> Filters
                </h3>
                {(selectedBrands.length > 0 || selectedCategories.length > 0 || maxPrice < 10000 || searchQuery) && (
                  <button onClick={clearFilters} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">Clear</button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 flex justify-between text-sm uppercase tracking-wider">Price <span className="text-bodygold">Up to ₹{maxPrice}</span></h4>
                <input 
                  type="range" 
                  min="500" max="10000" step="100" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-bodygold h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
                <div className="space-y-3">
                  {categoriesList.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(category, selectedCategories, setSelectedCategories)}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${selectedCategories.includes(category) ? 'bg-bodygold border-bodygold' : 'border-white/10 bg-[#0a0a0a] group-hover:border-bodygold'}`}>
                        {selectedCategories.includes(category) && <span className="text-[#0a0a0a] text-xs font-black">✓</span>}
                      </div>
                      <span className={`text-sm font-medium select-none transition-colors ${selectedCategories.includes(category) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Brands</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${selectedBrands.includes(brand) ? 'bg-bodygold border-bodygold' : 'border-white/10 bg-[#0a0a0a] group-hover:border-bodygold'}`}>
                        {selectedBrands.includes(brand) && <span className="text-[#0a0a0a] text-xs font-black">✓</span>}
                      </div>
                      <span className={`text-sm font-medium select-none transition-colors ${selectedBrands.includes(brand) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* MAIN GRID */}
          <div className="flex-1">
            
            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-end mb-6 border-b border-white/5 pb-4">
               <h2 className="text-3xl font-black text-white uppercase tracking-tight">SHOP ALL</h2>
               <p className="text-gray-500 font-bold text-sm tracking-wider">{filteredProducts.length} PRODUCTS FOUND</p>
            </div>

            {/* --- THE WHITE SEARCH BAR --- */}
            <div className="mb-8">
              <div className="relative flex items-center w-full h-14 rounded-full bg-white overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] focus-within:ring-4 focus-within:ring-bodygold/50 transition-all">
                <div className="grid place-items-center h-full w-16 text-gray-500">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  className="peer h-full w-full outline-none text-base text-gray-800 pr-12 bg-transparent font-bold placeholder-gray-400"
                  type="text"
                  placeholder="Search supplements, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {/* Clear Search Button */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 p-2 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#111111] rounded-2xl border border-white/5 p-16 text-center">
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wider">No products found</h3>
                <p className="text-gray-500 mb-8">
                  {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : "Try adjusting your filters to see more results."}
                </p>
                <button onClick={clearFilters} className="bg-bodygold text-darkgray font-black px-8 py-3 rounded hover:bg-yellow-400 transition-colors uppercase tracking-widest text-sm">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}