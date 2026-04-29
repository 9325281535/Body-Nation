"use client";

import { useCartStore } from "@/lib/store";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, cartTotal } = useCartStore();
  const total = cartTotal();
  const shipping = total > 3000 ? 0 : 150; // Free shipping over ₹3000

  // If cart is empty, show a return state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black text-darkgray mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any supplements yet.</p>
        <Link href="/proteins" className="bg-bodyblue text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-darkgray mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Shipping & Payment Form */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-darkgray mb-6 border-b pb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="Akash" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="you@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="+91" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-darkgray mb-6 border-b pb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="Flat No, Building, Street" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="Pune" defaultValue="Pune" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">PIN Code</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bodyblue focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-darkgray mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 border rounded-lg relative flex-shrink-0">
                      <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-darkgray leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.flavor}</p>
                    </div>
                    <div className="font-bold text-sm text-darkgray">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-darkgray">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-8">
                <span className="font-bold text-lg text-darkgray">Total</span>
                <span className="font-black text-3xl text-bodyblue">₹{total + shipping}</span>
              </div>

              <button className="w-full bg-bodyblue text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-bodyblue/30 active:scale-95">
                <CreditCard className="w-6 h-6" /> Proceed to Payment
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> 256-bit Secure SSL Checkout
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <Truck className="w-4 h-4 text-bodyblue" /> Ships securely within 24 hours
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}