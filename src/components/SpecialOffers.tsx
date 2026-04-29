"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Timer, Star } from "lucide-react";
import Image from "next/image"; // <-- Added Image import

// Dummy data for flash sale items
const offerProducts = [
  { id: 101, name: "GNC Pro Performance Whey", flavor: "Chocolate Supreme", oldPrice: "₹5,499", newPrice: "₹3,999", discount: "27% OFF", img: "/whey.png" },
  { id: 102, name: "BCAA 2:1:1 + Hydration", flavor: "Blue Raspberry", oldPrice: "₹2,199", newPrice: "₹1,499", discount: "31% OFF", img: "/whey.png" },
  { id: 103, name: "Peanut Butter (Crunchy)", flavor: "High Protein", oldPrice: "₹699", newPrice: "₹449", discount: "35% OFF", img: "/whey.png" },
];

export default function SpecialOffers() {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 25, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className="bg-darkgray py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-bodygold rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-bodyblue rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Timer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-700 pb-6">
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-wide flex items-center gap-3">
              <span className="text-bodygold">FLASH</span> SALE
            </h2>
            <p className="text-gray-400 mt-2">Grab these authentic supplements before stock runs out!</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4 bg-black/50 px-6 py-3 rounded-lg border border-gray-700">
            <Timer className="text-bodyblue w-6 h-6" />
            <div className="flex items-center gap-2 text-2xl font-bold text-white font-mono">
              <span>{formatTime(timeLeft.hours)}</span>
              <span className="text-bodygold">:</span>
              <span>{formatTime(timeLeft.minutes)}</span>
              <span className="text-bodygold">:</span>
              <span className="text-bodyblue">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Offer Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden relative group cursor-pointer hover:shadow-2xl hover:shadow-bodyblue/20 transition-all duration-300">
              
              {/* Pulsing Discount Badge */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-4 right-4 bg-red-600 text-white font-black px-3 py-1 rounded-md z-10 shadow-lg"
              >
                {product.discount}
              </motion.div>

              {/* Product Image Area with Next.js Image */}
              <div className="h-64 bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                 <Image 
                   src={product.img}
                   alt={product.name}
                   fill
                   className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                 />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-bodygold text-bodygold" />
                  ))}
                </div>
                <h3 className="font-extrabold text-xl text-darkgray leading-tight mb-1 group-hover:text-bodyblue transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 font-semibold mb-4">{product.flavor}</p>
                
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="text-gray-400 line-through text-sm font-bold block">{product.oldPrice}</span>
                    <span className="text-3xl font-black text-bodyblue block leading-none">{product.newPrice}</span>
                  </div>
                  
                  <button className="bg-bodygold text-darkgray hover:bg-yellow-500 p-3 rounded-xl transition-colors shadow-md z-20 relative">
                    <ShoppingBag className="w-6 h-6" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}