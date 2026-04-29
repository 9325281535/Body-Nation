"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function WishlistDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { wishlist, toggleWishlist, addToCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111111] sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/10 p-2 rounded-xl">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Wishlist</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/5">
                    <Heart className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Your wishlist is empty</p>
                  <button onClick={onClose} className="text-bodygold font-black underline uppercase text-xs tracking-widest hover:text-yellow-400">Explore Products</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 group bg-[#1a1a1a] p-3 rounded-2xl border border-white/5">
                      <div className="relative w-24 h-24 bg-[#111111] rounded-xl border border-white/5 p-2 shrink-0 overflow-hidden">
                        <Image src={item.img} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link href={`/product/${item.id}`} onClick={onClose}>
                              <h4 className="font-bold text-white text-sm leading-snug line-clamp-2 hover:text-bodygold transition-colors">{item.name}</h4>
                            </Link>
                            <button onClick={() => toggleWishlist(item)} className="text-gray-500 hover:text-red-500 transition-colors ml-2 shrink-0">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-black text-bodygold mt-1 block">₹{item.price}</span>
                        </div>
                        
                        <button 
                          onClick={() => {
                            addToCart({ id: item.id, name: item.name, price: item.price, img: item.img, flavor: "Standard", quantity: 1 });
                            toggleWishlist(item); // Optional: Removes it from wishlist after adding to cart!
                          }}
                          className="text-xs font-black bg-white/5 hover:bg-bodygold hover:text-[#0a0a0a] text-white py-2 rounded-lg transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}