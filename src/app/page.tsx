import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase"; 
import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero with the floating bar */}
      <Hero />

      {/* Space to prevent showcase from hiding under the floating bar */}
      <div className="h-24"></div>

      {/* The Dynamic Dark Storefront */}
      {/* NOTE: You will need to update ProductShowcase.tsx to use bg-[#0a0a0a] instead of bg-gray-50, and white text! */}
      <ProductShowcase />

      {/* The Bottom Trust Badges (Matching the screenshot precisely) */}
      <div className="bg-[#121212] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="text-white font-bold text-sm">FREE SHIPPING</h4>
                <p className="text-gray-500 text-xs">On orders over ₹4000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="text-white font-bold text-sm">EASY RETURNS</h4>
                <p className="text-gray-500 text-xs">30 day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="text-white font-bold text-sm">SECURE PAYMENTS</h4>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Headset className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="text-white font-bold text-sm">24/7 SUPPORT</h4>
                <p className="text-gray-500 text-xs">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}