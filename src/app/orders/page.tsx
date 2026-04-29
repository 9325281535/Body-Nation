import { Package, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dummy Order History
const pastOrders = [
  { id: "ORD-98231", date: "Oct 14, 2023", total: "₹6,499", status: "Delivered", items: [{ name: "Gold Standard 100% Whey", img: "/Whey_protein.png" }] },
  { id: "ORD-87452", date: "Sep 02, 2023", total: "₹2,499", status: "Delivered", items: [{ name: "C4 Original Pre-Workout", img: "/whey.png" }] },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-darkgray">My Orders</h1>
          <p className="text-gray-500 mt-2">Track, return, or buy items again.</p>
        </div>

        <div className="space-y-6">
          {pastOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Order Placed</p>
                    <p className="text-darkgray font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total</p>
                    <p className="text-darkgray font-semibold">{order.total}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Order ID</p>
                  <p className="text-bodyblue font-semibold">#{order.id}</p>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
                  <CheckCircle2 className="w-5 h-5" /> {order.status}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-xl relative flex-shrink-0 p-2">
                      <Image src={order.items[0].img} alt={order.items[0].name} fill className="object-contain" />
                    </div>
                    <h4 className="font-bold text-darkgray">{order.items[0].name}</h4>
                  </div>
                  
                  <button className="bg-gray-100 text-darkgray font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}