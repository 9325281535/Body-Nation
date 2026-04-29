"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, Ticket, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 4000 ? 0 : 150;
  const totalSavings = subtotal * 0.1; // Simulated original price savings
  const finalTotal = subtotal - appliedDiscount + deliveryCharge;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "BODY10") {
      setAppliedDiscount(subtotal * 0.1);
    } else {
      alert("Invalid Coupon Code");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-bodyblue/10 p-2 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-bodyblue" />
                </div>
                <h2 className="text-xl font-black text-darkgray uppercase">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                  </div>
                  <p className="text-gray-500 font-bold">Your cart is empty</p>
                  <button onClick={onClose} className="text-bodyblue font-black underline uppercase text-sm">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.flavor}`} className="flex gap-4 group">
                      <div className="relative w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 p-2 shrink-0 overflow-hidden">
                        <Image src={item.img} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-darkgray text-sm leading-snug line-clamp-2">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id, item.flavor)} className="text-gray-300 hover:text-red-500 transition-colors ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] font-black text-bodyblue uppercase mt-1 tracking-wider">{item.flavor}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-gray-50 rounded-lg px-1 border border-gray-100">
                            <button onClick={() => updateQuantity(item.id, item.flavor, item.quantity - 1)} className="p-1 hover:text-bodyblue transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.flavor, item.quantity + 1)} className="p-1 hover:text-bodyblue transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="font-black text-darkgray">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                {/* Coupon Code */}
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-bodyblue outline-none transition-all"
                    />
                  </div>
                  <button onClick={handleApplyCoupon} className="bg-darkgray text-white px-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">Apply</button>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm font-bold text-green-600">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Discount</span>
                      <span>-₹{Math.round(appliedDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <div className="flex flex-col">
                      <span>Delivery</span>
                      <span className="text-[10px] text-gray-400">Fast shipping to Pune</span>
                    </div>
                    <span>{deliveryCharge === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-darkgray pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{Math.round(finalTotal)}</span>
                  </div>
                  <p className="text-[10px] text-green-600 font-bold text-center pt-1">
                    You are saving ₹{Math.round(totalSavings + appliedDiscount)} on this order!
                  </p>
                </div>

                <Link href="/checkout" onClick={onClose}>
                  <button className="w-full bg-bodyblue text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-bodyblue/20 active:scale-95 mt-2 group">
                    PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}