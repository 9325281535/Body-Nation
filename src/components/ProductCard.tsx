"use client";

import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export interface ProductType {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  img: string;
  tag?: string;
  category: string;
  proteinPerScoop?: string;
  inStock?: boolean; 
  goal?: string;
  flavor?: string;
}

export default function ProductCard({ product }: { product: ProductType }) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  // WISHLIST LOGIC
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist);
  const isLiked = isInWishlist(product.id);

  const discountAmount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1a1a1a] rounded-xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-white/20 transition-colors relative"
    >
      {/* 1. THE NEW WISHLIST HEART BUTTON */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevents the card link from triggering when clicking the heart
          toggleWishlist({ id: product.id, name: product.name, price: product.price, img: product.img });
        }}
        className="absolute top-3 right-3 z-20 p-2 bg-[#0a0a0a]/50 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/5"
      >
        <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Top Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
        {discountAmount > 0 && (
          <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
            {discountAmount}% OFF
          </div>
        )}
        {product.tag && (
          <div className="bg-bodygold text-darkgray text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
            {product.tag}
          </div>
        )}
      </div>

      {/* Image Area */}
      <Link href={`/product/${product.id}`} className="block relative h-56 bg-[#121212] p-8 flex items-center justify-center overflow-hidden">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
        />
      </Link>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-[10px] text-bodygold font-black uppercase tracking-wider mb-1">{product.brand}</div>
        
        <Link href={`/product/${product.id}`} className="flex-grow">
          <h3 className="font-bold text-white text-sm mb-2 hover:text-bodygold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-bodygold text-bodygold" : "text-gray-600"}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1 font-medium">({product.reviews})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            {product.oldPrice && <span className="text-[10px] text-gray-500 line-through mb-0.5">₹{product.oldPrice}</span>}
            <span className="text-lg font-black text-white leading-none">₹{product.price}</span>
          </div>
          
          <button 
            onClick={() => addToCart({ 
              id: product.id, name: product.name, price: product.price, img: product.img, flavor: product.flavor || "Standard", quantity: 1
            })}
            className="text-[#0a0a0a] bg-bodygold hover:bg-yellow-400 p-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(255,204,0,0.2)] active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}