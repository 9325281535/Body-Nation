"use client";

import { Star, User, ThumbsUp } from "lucide-react";
import { useState } from "react";

// Dummy review data
const sampleReviews = [
  { id: 1, author: "Rahul M.", rating: 5, date: "Oct 12, 2023", text: "Genuine product. Verified on the official website. Mixability is great and taste is awesome.", helpful: 12 },
  { id: 2, author: "Sneha P.", rating: 4, date: "Sep 28, 2023", text: "Good protein, seeing results after 1 month. Delivery was super fast in Pune.", helpful: 5 },
];

export default function ProductReviews() {
  const [newReview, setNewReview] = useState("");

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-extrabold text-darkgray mb-8">Customer Reviews & Ratings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Side: Summary & Write Review */}
        <div className="col-span-1 bg-gray-50 p-6 rounded-2xl">
          <div className="text-center mb-6 border-b border-gray-200 pb-6">
            <h3 className="text-5xl font-black text-darkgray">4.8</h3>
            <div className="flex justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-bodygold text-bodygold" : "fill-bodygold/30 text-bodygold"}`} />
              ))}
            </div>
            <p className="text-gray-500 text-sm">Based on 124 verified reviews</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-darkgray">Write a Review</h4>
            <textarea 
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-bodyblue resize-none" 
              rows={4} 
              placeholder="How was the product?"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <button className="w-full bg-bodyblue text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">
              Submit Review
            </button>
          </div>
        </div>

        {/* Right Side: Review List */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {sampleReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 p-2 rounded-full text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-darkgray">{review.author} <span className="text-xs text-green-600 ml-2 bg-green-100 px-2 py-0.5 rounded-full">Verified Buyer</span></h5>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-bodygold text-bodygold" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-3">{review.text}</p>
              <button className="flex items-center gap-1 text-xs text-gray-500 font-semibold mt-4 hover:text-bodyblue transition-colors">
                <ThumbsUp className="w-4 h-4" /> Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}