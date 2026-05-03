"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search, Heart, MapPin, HelpCircle, Truck } from "lucide-react"; 
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // --- HYDRATION FIX ---
  // Tells Next.js to wait until client loads before rendering numbers from LocalStorage
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const cartCount = useCartStore((state) => state.cartCount()); 
  const wishlistCount = useCartStore((state) => state.wishlistCount());

  return (
    <>
      {/* 1. The Super Top Bar (Extra Info) */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 bg-[#121212] border-b border-white/5 text-[11px] font-bold text-gray-400 tracking-wider">
        <div className="flex items-center gap-2">
          <Truck className="w-3 h-3" /> Free Shipping on orders over ₹4000
        </div>
        <div className="text-bodygold">SUMMER SALE - Up to 30% OFF</div>
        <div className="flex gap-6">
          <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><HelpCircle className="w-3 h-3" /> Help & Support</span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><MapPin className="w-3 h-3" /> Track Order</span>
        </div>
      </div>

      {/* 2. Main Dark Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <h1 className="text-2xl font-black text-white italic tracking-tighter">
                  <span className="text-bodygold">BODY</span>NATION
                </h1>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-8 items-center font-bold text-sm tracking-wide text-gray-300">
              <Link href="/" className="text-bodygold border-b-2 border-bodygold pb-1">HOME</Link>
              <Link href="/shop" className="hover:text-white transition-colors pb-1">SHOP</Link>
              <Link href="/shop" className="hover:text-white transition-colors pb-1">NEW ARRIVALS</Link>
              <Link href="/offers" className="hover:text-white transition-colors pb-1">OFFERS</Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6 text-white">
              <Search className="w-5 h-5 hover:text-bodygold cursor-pointer transition-colors" />
              
              {/* UPDATED: User Icon now goes to /login */}
              <Link href="/login">
                <User className="w-5 h-5 hover:text-bodygold cursor-pointer transition-colors" />
              </Link>
              
              {/* Wishlist Icon */}
              <div className="relative cursor-pointer" onClick={() => setIsWishlistOpen(true)}>
                <Heart className="w-5 h-5 hover:text-bodygold transition-colors" />
                {isMounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              
              {/* Cart Icon */}
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-5 h-5 hover:text-bodygold transition-colors" />
                <span className="absolute -top-2 -right-2 bg-bodygold text-darkgray text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {isMounted ? cartCount : 0}
                </span>
              </div>
            </div>

            {/* Mobile Icons & Menu Button */}
            <div className="lg:hidden flex items-center gap-5 text-white">
              {/* Mobile Wishlist Icon */}
              <div className="relative cursor-pointer" onClick={() => setIsWishlistOpen(true)}>
                <Heart className="w-6 h-6 hover:text-bodygold transition-colors" />
                {isMounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* Mobile Cart Icon */}
               <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-6 h-6 hover:text-bodygold transition-colors" />
                <span className="absolute -top-2 -right-2 bg-bodygold text-darkgray text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {isMounted ? cartCount : 0}
                </span>
              </div>

              {/* Hamburger Menu */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hover:text-bodygold transition-colors ml-2">
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10">
            <div className="px-4 py-4 space-y-2 font-bold text-gray-300">
              <Link href="/" className="block px-3 py-2 rounded-md hover:bg-white/5 hover:text-bodygold">HOME</Link>
              <Link href="/shop" className="block px-3 py-2 rounded-md hover:bg-white/5 hover:text-bodygold">SHOP</Link>
              {/* UPDATED: Mobile Menu goes to /login */}
              <Link href="/login" className="block px-3 py-2 rounded-md hover:bg-white/5 hover:text-bodygold">LOGIN</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Render the Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}