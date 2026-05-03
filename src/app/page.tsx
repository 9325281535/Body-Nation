"use client";

import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      
      {/* Space to prevent showcase from hiding under the floating bar */}
      <div className="h-24"></div>
      
      <ProductShowcase />
      
      {/* Bottom Trust Badges */}
      <div className="bg-[#121212] border-t border-white/5 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-bodygold" />
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Free Shipping</h4>
                <p className="text-gray-500 text-xs font-medium">On orders over ₹4000</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RotateCcw className="w-8 h-8 text-bodygold" />
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Easy Returns</h4>
                <p className="text-gray-500 text-xs font-medium">14-day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-bodygold" />
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">100% Authentic</h4>
                <p className="text-gray-500 text-xs font-medium">Genuine products only</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Headset className="w-8 h-8 text-bodygold" />
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">24/7 Support</h4>
                <p className="text-gray-500 text-xs font-medium">Dedicated help desk</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}