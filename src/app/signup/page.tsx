"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Lock, Mail, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting Signup with:", name, email, password);
    // Future: Add your backend registration logic here
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <img src="/bodynation.jpeg" alt="Intense Gym" className="w-full h-full object-cover" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full space-y-10 z-10"
      >
        <div className="text-center">
          <Link href="/">
             <Dumbbell className="mx-auto w-16 h-16 text-bodygold mb-6 hover:scale-110 transition-transform cursor-pointer" />
          </Link>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-bodygold to-yellow-200">Grind</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Join the nation and achieve more</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-8 bg-[#1a1a1a] p-10 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative backdrop-blur-sm">
          
          {/* NAME INPUT */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-bodygold transition-colors" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR.FULL.NAME"
              className="w-full h-14 pl-12 pr-6 bg-[#0a0a0a] text-white border border-white/10 rounded-xl focus:border-bodygold focus:ring-1 focus:ring-bodygold outline-none font-bold placeholder-gray-600 text-sm tracking-wide uppercase transition-all"
            />
          </div>

          {/* EMAIL INPUT */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-bodygold transition-colors" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR.GRIND@EMAIL.COM"
              className="w-full h-14 pl-12 pr-6 bg-[#0a0a0a] text-white border border-white/10 rounded-xl focus:border-bodygold focus:ring-1 focus:ring-bodygold outline-none font-bold placeholder-gray-600 text-sm tracking-wide uppercase transition-all"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-bodygold transition-colors" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="CREATE_A_STRONG_PASSWORD"
              className="w-full h-14 pl-12 pr-6 bg-[#0a0a0a] text-white border border-white/10 rounded-xl focus:border-bodygold focus:ring-1 focus:ring-bodygold outline-none font-bold placeholder-gray-600 text-sm tracking-wide transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
             <input type="checkbox" required className="accent-bodygold w-4 h-4 rounded border-white/10 bg-[#0a0a0a] cursor-pointer" />
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">I agree to the <Link href="#" className="text-bodygold hover:underline">Terms of Service</Link></label>
          </div>

          {/* SIGNUP BUTTON */}
          <button 
            type="submit"
            className="w-full h-14 bg-bodygold text-[#0a0a0a] font-black text-lg rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,204,0,0.2)] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            Create My Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            Already a member?{" "}
            <Link href="/login" className="text-bodygold font-black underline hover:text-yellow-400 transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}