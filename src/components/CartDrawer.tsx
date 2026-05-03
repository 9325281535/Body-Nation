"use client";

import { useEffect, useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = useCartStore((state) => state.cartTotal());

  const shipping = total > 3000 ? 0 : 150;
  
  // Hydration fix to prevent Next.js server/client mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* Dark Blur Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />

      {/* Slide-out Cart Panel */}
      <div className={`absolute inset-y-0 right-0 w-full max-w-md bg-[#0a0a0a] shadow-2xl border-l border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bodygold/10 flex items-center justify-center rounded-xl border border-bodygold/20">
              <ShoppingBag className="w-5 h-5 text-bodygold" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Your Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CART ITEMS BODY */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag className="w-16 h-16 text-gray-500" />
              <div>
                <p className="text-white font-bold uppercase tracking-wider">Your cart is empty</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Add some items to get started.</p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Image */}
                <div className="w-20 h-20 bg-[#1a1a1a] border border-white/5 rounded-xl relative flex-shrink-0 p-2 group-hover:border-bodygold/50 transition-colors">
                  <Image src={item.img} alt={item.name} fill className="object-contain p-2" />
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] font-black text-bodygold uppercase tracking-wider mt-1">{item.flavor || "Standard"}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-black text-white">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER & CHECKOUT */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 bg-[#0a0a0a] p-6">
            
            {/* Coupon Input */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Discount Code" 
                  className="w-full bg-[#1a1a1a] text-white border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-bold placeholder-gray-600 focus:outline-none focus:border-bodygold transition-colors uppercase tracking-wider"
                />
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 rounded-xl font-bold text-sm transition-colors uppercase tracking-wider">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-bodygold">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              {shipping !== 0 && (
                <p className="text-[10px] text-gray-500 lowercase normal-case tracking-normal">Fast shipping to Pune</p>
              )}
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-black text-white uppercase tracking-wider">Total</span>
              <span className="text-3xl font-black text-bodygold">₹{total + shipping}</span>
            </div>
            
            {/* Promo Text */}
            <div className="text-center mb-4">
              <span className="text-green-500 text-xs font-bold uppercase tracking-wider">You are saving ₹180 on this order!</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={onClose} className="w-full bg-bodygold text-[#0a0a0a] font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,204,0,0.2)] active:scale-95 uppercase tracking-wider">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}