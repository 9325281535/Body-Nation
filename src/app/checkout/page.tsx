"use client";

import { useCartStore } from "@/lib/store";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.cartTotal()); 
  
  const shipping = total > 3000 ? 0 : 150; // Free shipping over ₹3000

  // Empty Cart State - Dark Theme
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 border-t border-white/5">
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Your Cart is <span className="text-bodygold">Empty</span></h2>
        <p className="text-gray-500 font-bold mb-8 uppercase tracking-widest text-sm">Looks like you haven't added any supplements yet.</p>
        <Link href="/shop" className="bg-bodygold text-[#0a0a0a] font-black uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,204,0,0.2)] hover:bg-yellow-400 transition-all active:scale-95">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">
          Secure <span className="text-bodygold">Checkout</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Shipping & Payment Form */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Contact Info */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl border border-white/5">
              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="Akash" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="Patil" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="you@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="+91" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl border border-white/5">
              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Street Address</label>
                  <input type="text" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="Flat No, Building, Street" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City</label>
                    <input type="text" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="Pune" defaultValue="Pune" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">PIN Code</label>
                    <input type="text" className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-bodygold focus:border-bodygold outline-none font-bold placeholder-gray-700 transition-all" placeholder="411001" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl border border-white/5 sticky top-28">
              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-xl relative flex-shrink-0 group-hover:border-bodygold/50 transition-colors">
                      <Image src={item.img} alt={item.name} fill className="object-contain p-2" />
                      <span className="absolute -top-2 -right-2 bg-bodygold text-[#0a0a0a] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white leading-tight line-clamp-2">{item.name}</h4>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{item.flavor || "Standard"}</p>
                    </div>
                    <div className="font-black text-sm text-white">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm font-bold text-gray-400 mb-6 border-t border-white/10 pt-6 uppercase tracking-wider">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-bodygold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-6 mb-8">
                <span className="font-black text-lg text-white uppercase tracking-wider">Total</span>
                <span className="font-black text-4xl text-bodygold">₹{total + shipping}</span>
              </div>

              <button className="w-full bg-bodygold text-[#0a0a0a] font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,204,0,0.2)] active:scale-95 uppercase tracking-wider">
                <CreditCard className="w-6 h-6" /> Proceed to Payment
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 justify-center uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> 256-bit Secure SSL Checkout
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 justify-center uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-bodygold" /> Ships securely within 24 hours
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}