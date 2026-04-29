"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Star, ShoppingCart, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // <-- Added Next.js Image import

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Temporary dummy data 
const sampleProducts = [
  { id: 1, name: "Gold Standard 100% Whey", brand: "Optimum Nutrition", price: "₹6,499", rating: 4.8, reviews: 124, tag: "Best Seller" },
  { id: 2, name: "Nitro-Tech Whey Gold", brand: "MuscleTech", price: "₹5,299", rating: 4.6, reviews: 89, tag: "" },
  { id: 3, name: "Iso100 Hydrolyzed", brand: "Dymatize", price: "₹7,999", rating: 4.9, reviews: 210, tag: "Premium" },
  { id: 4, name: "C4 Original Pre-Workout", brand: "Cellucor", price: "₹2,499", rating: 4.7, reviews: 356, tag: "High Energy" },
  { id: 5, name: "Platinum Creatine", brand: "MuscleTech", price: "₹1,299", rating: 4.5, reviews: 442, tag: "" },
];

export default function ProductSlider({ title }: { title: string }) {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-extrabold text-darkgray uppercase tracking-wide border-l-4 border-bodygold pl-4">
            {title}
          </h2>
          <button className="text-bodyblue font-bold hover:text-blue-700 transition-colors">
            View All &rarr;
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {sampleProducts.map((product) => (
            <SwiperSlide key={product.id}>
              {/* <-- Wrapped the card in a Link to the dynamic route --> */}
              <Link href={`/product/${product.id}`} className="block">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative group cursor-pointer"
                >
                  {/* Product Badge */}
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-bodygold text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {product.tag}
                    </div>
                  )}

                  {/* Image Area - UPDATED WITH NEXT.JS IMAGE */}
                  <div className="h-56 bg-white flex flex-col items-center justify-center relative p-4 group">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/whey.png" 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <button className="bg-white text-darkgray font-bold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-bodyblue hover:text-white shadow-xl transition-colors translate-y-4 group-hover:translate-y-0 duration-300">
                        <Info className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">{product.brand}</p>
                    <h3 className="font-bold text-lg text-darkgray leading-tight mb-2 truncate group-hover:text-bodyblue transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating System */}
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-4 h-4 fill-bodygold text-bodygold" />
                      <span className="text-sm font-bold text-darkgray">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-extrabold text-bodyblue">{product.price}</span>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.preventDefault()} // Prevents the link from firing if they just click the cart button
                        className="bg-gray-100 p-2 rounded-full text-darkgray hover:bg-bodygold hover:text-white transition-colors z-20 relative"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}