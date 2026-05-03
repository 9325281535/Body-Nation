"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Lock, Mail, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save a flag in the browser to prove the user is authenticated
    localStorage.setItem("bodynation_auth", "true");
    
    // Instantly redirect to the Profile page instead of Home!
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background Overlay */}
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
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-bodygold to-yellow-200">Back</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Login to continue your grind</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 bg-[#1a1a1a] p-10 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative backdrop-blur-sm">
          
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
              placeholder="YOUR_STRONG_PASSWORD"
              className="w-full h-14 pl-12 pr-6 bg-[#0a0a0a] text-white border border-white/10 rounded-xl focus:border-bodygold focus:ring-1 focus:ring-bodygold outline-none font-bold placeholder-gray-600 text-sm tracking-wide transition-all"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link href="#" className="text-xs font-bold text-gray-500 hover:text-bodygold transition-colors uppercase tracking-wider">
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button 
            type="submit"
            className="w-full h-14 bg-bodygold text-[#0a0a0a] font-black text-lg rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,204,0,0.2)] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            Authenticate & Proceed
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            New to Body Nation?{" "}
            <Link href="/signup" className="text-bodygold font-black underline hover:text-yellow-400">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}