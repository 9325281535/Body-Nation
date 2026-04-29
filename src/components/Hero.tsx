"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, Zap, Package, Wheat, Utensils } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 

// Tell TypeScript to ignore the CSS module errors
// @ts-ignore
import "swiper/css";

// The 3 background images
const backgroundImages = [
  "/bodynation.jpeg",
  "/gym.jpeg",
  "/gym2.jpeg",
];

// Your 5 categories
const categories = [
  { name: "OATS", sub: "Healthy Carbs", icon: Wheat },
  { name: "PROTEIN", sub: "Whey & Isolate", icon: Dumbbell },
  { name: "CREATINE", sub: "Strength", icon: Zap },
  { name: "PEANUT BUTTER", sub: "High Protein", icon: Utensils },
  { name: "SUPPLEMENTS", sub: "All Gym Gear", icon: Package },
];

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center border-b border-white/5 bg-[#0a0a0a]">
      
      {/* 1. BOTTOM LAYER: The Sliding Background Images (z-0) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Swiper
          modules={[Autoplay]} 
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1000} 
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          allowTouchMove={false}
          className="w-full h-full"
        >
          {backgroundImages.map((src, index) => (
            <SwiperSlide key={index} className="w-full h-full bg-[#0a0a0a]">
              <Image
                src={src}
                alt={`Bodynation Background ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-[70%_center] md:object-center" 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. MIDDLE LAYER: The Fade Gradient (z-10) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>

      {/* 3. TOP LAYER: The Text & Buttons (z-20) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-12 pb-32 pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center">
          
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 leading-[1.05]">
              BUILD STRENGTH<br />
              <span className="text-bodygold">ACHIEVE MORE</span>
            </h1>
            
            {/* UPDATED TEXT HERE */}
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md font-medium leading-relaxed">
              Fuel your grind with 100% authentic Whey Protein, Creatine, Oats and elite sports supplements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <button className="w-full sm:w-auto px-8 py-4 bg-bodygold text-darkgray font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(255,204,0,0.3)]">
                  Shop Now →
                </button>
              </Link>
              <Link href="/shop">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Explore Collection
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Category Bar (z-30) */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#1a1a1a] rounded-2xl border border-white/5 shadow-2xl overflow-x-auto hide-scrollbar">
          <div className="flex justify-between items-center p-6 min-w-[800px]">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-4 cursor-pointer group px-4 border-r border-white/5 last:border-0 w-1/5">
                <cat.icon className="w-8 h-8 text-gray-500 group-hover:text-bodygold transition-colors shrink-0" />
                <div className="shrink-0">
                  <h4 className="text-white font-bold text-sm tracking-wider group-hover:text-bodygold transition-colors">{cat.name}</h4>
                  <p className="text-gray-500 text-xs">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}              