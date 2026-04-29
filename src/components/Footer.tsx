import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-darkgray pt-12 pb-8 border-t-4 border-bodyblue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Branding */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-1 font-extrabold text-3xl tracking-tighter mb-4">
              <span className="text-bodyblue">BODY</span>
              <span className="text-bodygold">NATION</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Your trusted partner for premium sports nutrition and supplements in Pune. Fueling athletes and fitness enthusiasts with 100% genuine products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/proteins" className="hover:text-bodyblue transition-colors">Proteins</Link></li>
              <li><Link href="/performance" className="hover:text-bodyblue transition-colors">Pre-Workouts</Link></li>
              <li><Link href="/creatine" className="hover:text-bodyblue transition-colors">Creatine</Link></li>
              <li><Link href="/offers" className="text-bodygold hover:text-white transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-bodyblue transition-colors">Contact Us</Link></li>
              <li><Link href="/authenticity" className="hover:text-bodyblue transition-colors">Authenticity Guarantee</Link></li>
              <li><Link href="/shipping" className="hover:text-bodyblue transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-bodyblue transition-colors">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bodynation Sports & Nutrition. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Champions</p>
        </div>
      </div>
    </footer>
  );
}