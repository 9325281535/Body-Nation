"use client";

import { motion } from "framer-motion";
import { Package, MapPin, MessageSquare, Settings, LogOut, User, ChevronRight } from "lucide-react";
import Link from "next/link"; // <-- Imported Link here

export default function ProfilePage() {
  const menuItems = [
    { 
      title: "My Orders", 
      description: "Track, return, or buy items again", 
      icon: <Package className="w-6 h-6 text-bodygold" />,
      color: "bg-bodygold/10",
      href: "/orders" // <-- Added the href routing here
    },
    { 
      title: "Saved Addresses", 
      description: "Manage shipping and billing addresses", 
      icon: <MapPin className="w-6 h-6 text-green-500" />,
      color: "bg-green-500/10",
      href: "/addresses"
    },
    { 
      title: "Customer Feedback", 
      description: "Share your experience with us", 
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-500/10"
    },
    { 
      title: "Account Settings", 
      description: "Update password and security", 
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-500/10"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-12 pb-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">My <span className="text-bodygold">Account</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Manage your profile, orders, and preferences.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-[#1a1a1a] rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-bodygold/10 to-transparent"></div>

              <div className="w-24 h-24 bg-[#0a0a0a] rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(255,204,0,0.1)]">
                <User className="w-10 h-10 text-bodygold" />
              </div>
              
              <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-1 relative z-10">Akash Patil</h2>
              <p className="text-gray-500 font-medium text-sm mb-6 relative z-10">akash.fit@example.com</p>
              
              <div className="bg-bodygold/10 border border-bodygold/20 text-bodygold px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-8 relative z-10">
                Premium Member
              </div>

              <button className="w-full py-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 font-black uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 group relative z-10">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Menu Items */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#1a1a1a] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
              {/* Changed div to Link dynamically mapping to the href */}
              {menuItems.map((item, index) => (
                <Link 
                  href={item.href || "#"} 
                  key={index} 
                  className={`group flex items-center p-6 sm:p-8 cursor-pointer hover:bg-[#222222] transition-colors ${
                    index !== menuItems.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 border border-white/5`}>
                    {item.icon}
                  </div>
                  
                  <div className="ml-6 flex-grow">
                    <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1 group-hover:text-bodygold transition-colors">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{item.description}</p>
                  </div>

                  <div className="shrink-0 text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}