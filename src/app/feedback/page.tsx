"use client";

import { Send, Star } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-darkgray tracking-tight mb-4">We Value Your Feedback</h1>
          <p className="text-gray-600 text-lg">Help us improve Bodynation by sharing your experience.</p>
        </div>

        <form className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Rating */}
          <div className="flex flex-col items-center mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">How would you rate your experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 cursor-pointer transition-colors ${rating >= star ? 'fill-bodygold text-bodygold' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-bodyblue focus:outline-none" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
            <textarea 
              rows={5} 
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-bodyblue focus:outline-none resize-none" 
              placeholder="Tell us what you loved or what we can do better..."
            ></textarea>
          </div>

          <button className="w-full bg-bodyblue text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-bodyblue/30 active:scale-95">
            <Send className="w-5 h-5" /> Submit Feedback
          </button>
        </form>

      </div>
    </div>
  );
}