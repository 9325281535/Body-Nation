"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, ChevronLeft, Search, Receipt } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data for Orders
const mockOrders = [
  {
    id: "ORD-9824-BN",
    date: "April 28, 2026",
    status: "Delivered",
    total: 3598,
    items: [
      { id: 1, name: "Platinum 100% Whey", flavor: "Double Rich Chocolate", price: 3598, quantity: 1, img: "/whey.png" }
    ]
  },
  {
    id: "ORD-8711-BN",
    date: "April 20, 2026",
    status: "In Transit",
    total: 1598,
    items: [
      { id: 2, name: "Micronized Creatine", flavor: "Unflavored", price: 999, quantity: 1, img: "/creatine.jpg" },
      { id: 3, name: "Chocolate Peanut Butter", flavor: "Crunchy", price: 599, quantity: 1, img: "/peanut_butter.jpg" }
    ]
  }
];

export default function OrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "In Transit":
        return "text-bodygold bg-bodygold/10 border-bodygold/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4 mr-2" />;
      case "In Transit":
        return <Truck className="w-4 h-4 mr-2" />;
      default:
        return <Package className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-12 pb-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link href="/profile" className="inline-flex items-center text-gray-400 hover:text-bodygold font-bold text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Profile
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">My <span className="text-bodygold">Orders</span></h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Track, return, or buy items again.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bodygold transition-colors" />
              <input
                type="text"
                placeholder="SEARCH ORDERS..."
                className="w-full sm:w-64 h-12 pl-12 pr-4 bg-[#1a1a1a] text-white border border-white/10 rounded-xl focus:border-bodygold focus:ring-1 focus:ring-bodygold outline-none font-bold placeholder-gray-600 text-xs tracking-wide uppercase transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-8 border-b border-white/5 bg-[#121212]/50 gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                    <p className="text-sm font-bold text-white">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-sm font-bold text-white">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-sm font-bold text-white">{order.id}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                  <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors">
                    <Receipt className="w-4 h-4" /> Invoice
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 sm:p-8 space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group">
                    <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-2xl relative flex-shrink-0 group-hover:border-bodygold/50 transition-colors p-2">
                      <Image src={item.img} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">{item.name}</h3>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{item.flavor}</p>
                      <p className="text-sm font-bold text-gray-400">Qty: {item.quantity}</p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                      <p className="font-black text-lg text-white">₹{item.price}</p>
                      <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-bodygold hover:text-black text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-bodygold active:scale-95">
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}