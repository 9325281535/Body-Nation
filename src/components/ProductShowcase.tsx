"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react"; 
import ProductCard, { ProductType } from "./ProductCard";

// --- THE CLEANED SHOWCASE DATABASE ---
// Featuring your updated image paths and simplified review counts!
const allProducts: ProductType[] = [
  // WHEY PROTEIN
  { id: 1, name: "Gold Standard 100% Whey", brand: "Optimum Nutrition", price: 6499, oldPrice: 8999, rating: 4.8, reviews: 3200, img: "/whey_gold-standard-100-whey.jpg", tag: "Best Seller", category: "Whey Protein" },
  { id: 2, name: "Nitro-Tech Whey Gold", brand: "MuscleTech", price: 5299, rating: 4.6, reviews: 1890, img: "/whey_MuscleTech_NitroTech_whey.webp", category: "Whey Protein" },
  { id: 3, name: "Iso100 Hydrolyzed", brand: "Dymatize", price: 7999, rating: 4.9, reviews: 2512, img: "/whey_iso_100_whey.jpeg", tag: "Premium", category: "Whey Protein" },
  { id: 4, name: "Pro Performance Whey", brand: "GNC", price: 3999, rating: 4.5, reviews: 1312, img: "/whey_GNC_pro_performance_whey.webp", category: "Whey Protein" },
  { id: 5, name: "Impact Whey Protein", brand: "MyProtein", price: 2999, rating: 4.4, reviews: 4500, img: "/whey_Impact_whey.png", category: "Whey Protein" },
  { id: 6, name: "Biozyme Performance Whey", brand: "MuscleBlaze", price: 2499, rating: 4.6, reviews: 5600, img: "/whey_muscleblaze-biozyme-performance-whey.webp", tag: "Trending", category: "Whey Protein" },
  { id: 7, name: "Atom Whey Protein", brand: "Asitis", price: 1899, rating: 4.3, reviews: 2100, img: "/whey_atom_whey.jpeg", category: "Whey Protein" },
  { id: 8, name: "Platinum Whey", brand: "Nakpro", price: 1799, rating: 4.2, reviews: 1800, img: "/whey_platanium_whey.webp", category: "Whey Protein" },
  { id: 9, name: "Avvatar Absolute Whey", brand: "Avvatar", price: 2199, rating: 4.5, reviews: 900, img: "/whey_avvatar_whey.webp", category: "Whey Protein" },
  { id: 10, name: "Muscle Blaze Protein", brand: "Ultimate Nutrition", price: 4499, rating: 4.6, reviews: 1200, img: "/whey_mb_protein.webp", category: "Whey Protein" },
  { id: 11, name: "Syntha-6 Protein Crisp", brand: "BSN", price: 5499, rating: 4.7, reviews: 850, img: "/whey_Syntha-6.webp", category: "Whey Protein" },
  { id: 12, name: "Zero Carb Isopure", brand: "Isopure", price: 8999, rating: 4.8, reviews: 600, img: "/whey.png", category: "Whey Protein" },

  // CREATINE
  { id: 13, name: "Micronized Creatine Powder", brand: "Optimum Nutrition", price: 999, rating: 4.8, reviews: 4200, img: "/creatine.jpg", tag: "Essential", category: "Creatine" },
  { id: 14, name: "Platinum 100% Creatine", brand: "MuscleTech", price: 1299, rating: 4.7, reviews: 3100, img: "/creatine.jpg", category: "Creatine" },
  { id: 15, name: "Creapro Creatine with Creapure", brand: "MuscleBlaze", price: 1199, rating: 4.6, reviews: 2800, img: "/creatine.jpg", category: "Creatine" },
  { id: 16, name: "Creatine Monohydrate", brand: "GNC", price: 899, rating: 4.5, reviews: 1500, img: "/creatine.jpg", category: "Creatine" },
  { id: 17, name: "Pure Creatine", brand: "Asitis", price: 599, rating: 4.4, reviews: 2200, img: "/creatine.jpg", category: "Creatine" },

// OATS (18-22)
  { id: 18, name: "High Protein Oats", brand: "MuscleBlaze", price: 499, rating: 4.5, reviews: 1200, img: "/oats_mb.webp", tag: "Healthy", category: "Oats" },
  { id: 19, name: "20g Protein Oats", brand: "Yogabar", price: 399, rating: 4.6, reviews: 850, img: "/oats_yogabar_protein.webp", category: "Oats" },
  { id: 20, name: "High Protein Oats", brand: "Pintola", price: 199, rating: 4.7, reviews: 5000, img: "/oats_pintola.jpeg", category: "Oats" },
  { id: 21, name: "Whole Oatmeal", brand: "Alpino", price: 299, rating: 4.4, reviews: 600, img: "/oats_alpino.webp", category: "Oats" },
  { id: 22, name: "Protein Oats with Probiotics", brand: "MuscleXP", price: 450, rating: 4.3, reviews: 300, img: "/mb_protein.webp", category: "Oats" },

  // PEANUT BUTTER (23-27)
  { id: 23, name: "High Protein Peanut Butter", brand: "Pintola", price: 699, oldPrice: 899, rating: 4.8, reviews: 8000, img: "/peanut_butter_pintola.webp", tag: "Top Rated", category: "Peanut Butter" },
  { id: 24, name: "Chocolate Peanut Butter", brand: "MyFitness", price: 599, rating: 4.7, reviews: 6500, img: "/peanut_butter_myfitness.webp", category: "Peanut Butter" },
  { id: 25, name: "Natural Peanut Butter", brand: "Alpino", price: 499, rating: 4.6, reviews: 4000, img: "/peanut_butter_alpino.webp", category: "Peanut Butter" },
  { id: 26, name: "Protein Peanut Butter", brand: "MuscleBlaze", price: 549, rating: 4.5, reviews: 3200, img: "/peanut_butter_mb.jpeg", category: "Peanut Butter" },
  { id: 27, name: "Crunchy Peanut Butter", brand: "DiSano", price: 349, rating: 4.3, reviews: 1500, img: "/peanut_butter.jpg", category: "Peanut Butter" },

  // MASS GAINER (28-31)
  { id: 28, name: "Serious Mass", brand: "Optimum Nutrition", price: 3499, rating: 4.6, reviews: 2100, img: "/gainer_Serious_mass.webp", category: "Mass Gainer" },
  { id: 29, name: "Super Gainer XXL", brand: "MuscleBlaze", price: 2899, rating: 4.5, reviews: 3400, img: "/gainer_MuscleBlaze_Super_Gainer_XXL.jpeg", category: "Mass Gainer" },
  { id: 30, name: "Muscle Mass Gainer", brand: "Labrada", price: 4199, rating: 4.7, reviews: 1800, img: "/Whey_protein.png", category: "Mass Gainer" },
  { id: 31, name: "Super Mass Gainer", brand: "Dymatize", price: 4599, rating: 4.6, reviews: 900, img: "/gainer_Super_Mass_Gainer.webp", category: "Mass Gainer" },

  // BCAA & GLUTAMINE (32-35)
  { id: 32, name: "Xtend BCAA Powder", brand: "Scivation", price: 2199, rating: 4.8, reviews: 5000, img: "/whey.png", tag: "Recovery", category: "BCAA" },
  { id: 33, name: "L-Glutamine Muscle Recovery", brand: "Optimum Nutrition", price: 1499, rating: 4.7, reviews: 1200, img: "/Whey_protein.png", category: "Glutamine" },
  { id: 34, name: "BCAA Pro", brand: "MuscleBlaze", price: 1299, rating: 4.5, reviews: 2200, img: "/whey.png", category: "BCAA" },
  { id: 35, name: "Pro Performance L-Glutamine", brand: "GNC", price: 1199, rating: 4.6, reviews: 800, img: "/Whey_protein.png", category: "Glutamine" },

  // PROTEIN BARS (36-38)
  { id: 36, name: "Max Protein Daily Bar", brand: "Maxx Protein", price: 720, rating: 4.5, reviews: 1100, img: "/proteinbar_maxx_protein.jpeg", category: "Protein Bars" },
  { id: 37, name: "20g Protein Bar", brand: "Yogabar", price: 800, rating: 4.6, reviews: 950, img: "/proteinbar_yoga_bar.avif", category: "Protein Bars" },
  { id: 38, name: "Atom Protein Bars", brand: "Atom", price: 2500, rating: 4.8, reviews: 400, img: "/proteinbar_atom.jpeg", tag: "Imported", category: "Protein Bars" },
];

const categories = [
  "All", 
  "Whey Protein", 
  "Mass Gainer", 
  "Creatine", 
  "Glutamine", 
  "Oats", 
  "Protein Bars", 
  "Peanut Butter", 
  "BCAA"
];

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on BOTH category and search query
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Theme Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white uppercase">
            Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-bodygold to-yellow-200">Category</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Browse our massive collection of premium supplements. Filter by category to find exactly what your body needs.
          </p>
        </div>

        {/* --- THE WHITE SEARCH BAR --- */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center w-full h-14 rounded-full bg-white overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] focus-within:ring-4 focus-within:ring-bodygold/50 transition-all">
            <div className="grid place-items-center h-full w-16 text-gray-500">
              <Search className="w-6 h-6" />
            </div>

            <input
              className="peer h-full w-full outline-none text-base text-gray-800 pr-4 bg-transparent font-bold placeholder-gray-400"
              type="text"
              id="search"
              placeholder="Search supplements, brands (e.g. Optimum Nutrition)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Clear Button (Only shows when typing) */}
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

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSearchQuery(""); // Clears search when clicking a new category
              }}
              className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-bodygold text-[#0a0a0a] shadow-[0_0_20px_rgba(255,204,0,0.3)] scale-105"
                  : "bg-[#1a1a1a] text-gray-400 border border-white/5 hover:border-bodygold/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Animated Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State (If search or category yields no results) */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-[#111111] rounded-3xl border border-white/5"
          >
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wider">No products found</h3>
            <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">
              {searchQuery ? `No results for "${searchQuery}"` : "More products coming soon to this category!"}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-3 bg-bodygold text-darkgray font-black rounded-lg uppercase tracking-wider hover:bg-yellow-400 transition-colors"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}