import { User, Package, MapPin, Settings, MessageSquare, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-darkgray">My Account</h1>
          <p className="text-gray-500 mt-2">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: User Info Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-24 h-24 bg-bodyblue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-bodyblue" />
              </div>
              <h2 className="text-xl font-bold text-darkgray">Akash Patil</h2>
              <p className="text-gray-500 text-sm mb-4">akash.fit@example.com</p>
              <div className="inline-block bg-bodygold/10 text-bodygold font-bold px-3 py-1 rounded-full text-xs">
                Premium Member
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>

          {/* Right Column: Navigation Menu */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              <Link href="/orders" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-bodyblue group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-darkgray text-lg">My Orders</h3>
                    <p className="text-gray-500 text-sm">Track, return, or buy items again</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-bodyblue transition-colors" />
              </Link>

              <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-3 rounded-xl text-green-600 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-darkgray text-lg">Saved Addresses</h3>
                    <p className="text-gray-500 text-sm">Manage shipping and billing addresses</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>

              <Link href="/feedback" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-darkgray text-lg">Customer Feedback</h3>
                    <p className="text-gray-500 text-sm">Share your experience with us</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </Link>

              <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-xl text-gray-600 group-hover:scale-110 transition-transform">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-darkgray text-lg">Account Settings</h3>
                    <p className="text-gray-500 text-sm">Update password and security</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}