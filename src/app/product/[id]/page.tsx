"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Star, ShoppingCart, ArrowLeft, ShieldCheck, 
  Truck, CheckCircle2, Zap, Info, Dumbbell, MessageSquare, Beaker 
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

// THE MASSIVE DATABASE: All 38 products are now here!
const productsDB = [
  // WHEY PROTEIN (1-12)
  { id: 1, name: "Gold Standard 100% Whey", brand: "Optimum Nutrition", price: 6499, oldPrice: 8999, img: "/whey_gold-standard-100-whey.jpg", protein: "24g", calories: "120 kcal", servings: "74", inStock: true, flavors: ["Double Rich Chocolate", "Vanilla Ice Cream", "Delicious Strawberry"], sizes: ["2 lbs", "5 lbs", "10 lbs"], description: "The world's best-selling whey protein powder. Primarily from Whey Protein Isolate.", ingredients: "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate), Lecithin, Flavors.", usage: "Add one scoop to 6-8 ounces of water. Consume post-workout.", reviews: [{ id: 1, user: "Pratik S.", rating: 5, date: "2 days ago", comment: "Best taste and mixability." }] },
  { id: 2, name: "Nitro-Tech Whey Gold", brand: "MuscleTech", price: 5299, img: "/whey_MuscleTech_NitroTech_whey.webp", protein: "24g", calories: "130 kcal", servings: "69", inStock: true, flavors: ["Double Rich Chocolate", "French Vanilla"], sizes: ["2.2 lbs", "5.5 lbs"], description: "A pure protein formula featuring whey peptides and isolate.", ingredients: "Premium Protein Blend (Whey Peptides, Whey Protein Isolate).", usage: "Mix 1 scoop with 6 oz. of cold water in a shaker.", reviews: [{ id: 1, user: "Rahul M.", rating: 4, date: "1 week ago", comment: "Great recovery." }] },
  { id: 3, name: "Iso100 Hydrolyzed", brand: "Dymatize", price: 7999, img: "/whey_iso_100_whey.jpeg", protein: "25g", calories: "110 kcal", servings: "71", inStock: true, flavors: ["Gourmet Chocolate", "Fudge Brownie"], sizes: ["3 lbs", "5 lbs"], description: "Super fast-digesting and absorbing hydrolyzed 100% whey protein isolate.", ingredients: "Hydrolyzed Whey Protein Isolate, Whey Protein Isolate.", usage: "Formulated for easy mixing. Add one scoop to water.", reviews: [{ id: 1, user: "Amit", rating: 5, date: "3 weeks ago", comment: "Zero bloating, highly recommend." }] },
  { id: 4, name: "Pro Performance Whey", brand: "GNC", price: 3999, img: "/whey_GNC_pro_performance_whey.webp", protein: "24g", calories: "130 kcal", servings: "60", inStock: true, flavors: ["Chocolate Supreme", "Vanilla"], sizes: ["2 lbs", "4 lbs"], description: "High-quality, macronutrient protein formula.", ingredients: "Whey Protein Concentrate, Whey Protein Isolate.", usage: "Mix 1 scoop with 8 oz water.", reviews: [{ id: 1, user: "Vikram", rating: 4, date: "1 month ago", comment: "Good budget protein." }] },
  { id: 5, name: "Impact Whey Protein", brand: "MyProtein", price: 2999, img: "/whey_Impact_whey.png", protein: "21g", calories: "103 kcal", servings: "40", inStock: true, flavors: ["Chocolate Smooth", "Salted Caramel"], sizes: ["1 kg", "2.5 kg"], description: "Premium whey packed with 21g of protein per serving.", ingredients: "Whey Protein Concentrate (Milk), Emulsifier (Soy Lecithin).", usage: "Add 1 large scoop (25g) to 150-250ml of water or milk.", reviews: [{ id: 1, user: "Neha", rating: 5, date: "1 week ago", comment: "Mixes well and tastes decent." }] },
  { id: 6, name: "Biozyme Performance Whey", brand: "MuscleBlaze", price: 2499, img: "/whey_muscleblaze-biozyme-performance-whey.webp", protein: "25g", calories: "120 kcal", servings: "50", inStock: true, flavors: ["Rich Chocolate", "Magical Mango"], sizes: ["1 kg", "2 kg"], description: "Clinically tested for 50% higher protein absorption.", ingredients: "Whey Protein Concentrate, Enhanced Absorption Formula.", usage: "1 scoop in 200ml water post workout.", reviews: [{ id: 1, user: "Suraj", rating: 5, date: "2 days ago", comment: "No digestion issues at all." }] },
  { id: 7, name: "Atom Whey Protein", brand: "Asitis", price: 1899, img: "/whey_atom_whey.jpeg", protein: "27g", calories: "115 kcal", servings: "30", inStock: true, flavors: ["Double Rich Chocolate"], sizes: ["1 kg"], description: "USA lab tested and completely pure protein.", ingredients: "Whey Protein Concentrate, Enzyme Blend.", usage: "Mix 1 scoop with 250ml water.", reviews: [{ id: 1, user: "Karan", rating: 4, date: "5 days ago", comment: "Value for money." }] },
  { id: 8, name: "Platinum Whey", brand: "Nakpro", price: 1799, img: "/whey_platanium_whey.webp", protein: "28g", calories: "110 kcal", servings: "33", inStock: true, flavors: ["Chocolate", "Strawberry"], sizes: ["1 kg"], description: "Imported whey protein isolate and concentrate blend.", ingredients: "Whey Protein Isolate, Cocoa Powder.", usage: "Add 1 scoop to 200ml cold milk.", reviews: [{ id: 1, user: "Raj", rating: 4, date: "1 week ago", comment: "High protein per scoop." }] },
  { id: 9, name: "Avvatar Absolute Whey", brand: "Avvatar", price: 2199, img: "/whey_avvatar_whey.webp", protein: "24g", calories: "125 kcal", servings: "28", inStock: true, flavors: ["Belgian Chocolate", "Malai Kulfi"], sizes: ["1 kg", "2 kg"], description: "100% vegetarian whey protein made from fresh cow's milk.", ingredients: "Whey Protein, Cocoa, Sunflower Lecithin.", usage: "Mix 1 scoop in 200ml water.", reviews: [{ id: 1, user: "Sneha", rating: 5, date: "3 weeks ago", comment: "The Malai Kulfi flavor is amazing!" }] },
  { id: 10, name: "Muscle Blaze Protein", brand: "Ultimate Nutrition", price: 4499, img: "/whey_mb_protein.webp", protein: "25g", calories: "120 kcal", servings: "80", inStock: true, flavors: ["Cocoa Mocha", "Vanilla"], sizes: ["5.28 lbs"], description: "High-quality blend of whey protein isolate and concentrate.", ingredients: "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate).", usage: "Take 1-3 servings daily.", reviews: [{ id: 1, user: "Rohan", rating: 5, date: "1 month ago", comment: "Old school but still the best." }] },
  { id: 11, name: "Syntha-6 Protein Crisp", brand: "BSN", price: 5499, img: "/whey_Syntha-6.webp", protein: "22g", calories: "200 kcal", servings: "48", inStock: true, flavors: ["Chocolate Milkshake", "Strawberry"], sizes: ["5 lbs"], description: "Ultra-premium protein matrix with ridiculous taste.", ingredients: "Protein Matrix (Whey Protein Concentrate, Calcium Caseinate, Milk Protein Isolate).", usage: "Mix 1 scoop with 4-5 oz of cold water.", reviews: [{ id: 1, user: "Arjun", rating: 5, date: "2 weeks ago", comment: "Tastes literally like a milkshake." }] },
  { id: 12, name: "Zero Carb Isopure", brand: "Isopure", price: 8999, img: "/whey.png", protein: "25g", calories: "100 kcal", servings: "44", inStock: true, flavors: ["Creamy Vanilla", "Dutch Chocolate"], sizes: ["3 lbs", "7.5 lbs"], description: "100% whey protein isolate with zero carbs.", ingredients: "Ion Exchange Whey Protein Isolate, Vitamin/Mineral Blend.", usage: "Mix 2 scoops in 12 oz water.", reviews: [{ id: 1, user: "Pooja", rating: 5, date: "1 month ago", comment: "Perfect for my keto diet." }] },

  // CREATINE (13-17)
  { id: 13, name: "Micronized Creatine Powder", brand: "Optimum Nutrition", price: 999, img: "/creatine.jpg", protein: "0g", calories: "0 kcal", servings: "60", inStock: true, flavors: ["Unflavored"], sizes: ["300g", "600g"], description: "Highly researched, micronized creatine monohydrate.", ingredients: "100% Pure Creatine Monohydrate.", usage: "Add 1 rounded teaspoon to water. Consume daily.", reviews: [{ id: 1, user: "Amit K.", rating: 5, date: "3 weeks ago", comment: "Mixes perfectly." }] },
  { id: 14, name: "Platinum 100% Creatine", brand: "MuscleTech", price: 1299, img: "/creatine.jpg", protein: "0g", calories: "0 kcal", servings: "80", inStock: true, flavors: ["Unflavored"], sizes: ["400g"], description: "Ultra-pure micronized creatine powder.", ingredients: "Creatine Monohydrate.", usage: "Take 1 scoop daily.", reviews: [{ id: 1, user: "Sid", rating: 4, date: "1 week ago", comment: "Good pump during workouts." }] },
  { id: 15, name: "Creapro Creatine with Creapure", brand: "MuscleBlaze", price: 1199, img: "/creatine.jpg", protein: "0g", calories: "0 kcal", servings: "83", inStock: true, flavors: ["Unflavored"], sizes: ["250g"], description: "Contains Creapure, the purest form of creatine.", ingredients: "Creapure (Creatine Monohydrate).", usage: "Mix 3g with 200ml water.", reviews: [{ id: 1, user: "Ravi", rating: 5, date: "2 weeks ago", comment: "Creapure is the best." }] },
  { id: 16, name: "Creatine Monohydrate", brand: "GNC", price: 899, img: "/creatine.jpg", protein: "0g", calories: "0 kcal", servings: "50", inStock: true, flavors: ["Unflavored"], sizes: ["250g"], description: "Improves athletic performance and stamina.", ingredients: "Creatine Monohydrate.", usage: "Mix 1 scoop with water before workout.", reviews: [{ id: 1, user: "Anil", rating: 4, date: "1 month ago", comment: "Standard creatine, does the job." }] },
  { id: 17, name: "Pure Creatine", brand: "Asitis", price: 599, img: "/creatine.jpg", protein: "0g", calories: "0 kcal", servings: "33", inStock: true, flavors: ["Unflavored"], sizes: ["100g", "250g"], description: "100% pure and unadulterated creatine.", ingredients: "Creatine Monohydrate.", usage: "Take 3g daily.", reviews: [{ id: 1, user: "Varun", rating: 5, date: "3 days ago", comment: "Cheapest and best." }] },

  // OATS (18-22)
  { id: 18, name: "High Protein Oats", brand: "MuscleBlaze", price: 499, img: "/oats_mb.webp", protein: "22g", calories: "380 kcal", servings: "10", inStock: true, flavors: ["Dark Chocolate"], sizes: ["1 kg"], description: "Power packed breakfast for champions.", ingredients: "Rolled Oats, Soy Protein Isolate, Cocoa.", usage: "Add to hot/cold milk, stir and eat.", reviews: [{ id: 1, user: "Yash", rating: 5, date: "1 week ago", comment: "Tastes like a dessert!" }] },
  { id: 19, name: "20g Protein Oats", brand: "Yogabar", price: 399, img: "/oats_yogabar_protein.webp", protein: "20g", calories: "350 kcal", servings: "10", inStock: true, flavors: ["Chocolate", "Almond Crunch"], sizes: ["400g"], description: "Healthy carbs mixed with high quality whey.", ingredients: "Oats, Whey Protein, Almonds.", usage: "Add hot water or milk.", reviews: [{ id: 1, user: "Shruti", rating: 4, date: "2 weeks ago", comment: "Very filling." }] },
  { id: 20, name: "High Protein Oats", brand: "Pintola", price: 199, img: "/oats_pintola.jpeg", protein: "11g", calories: "374 kcal", servings: "25", inStock: true, flavors: ["Plain"], sizes: ["1 kg"], description: "100% natural wholegrain rolled oats.", ingredients: "Rolled Oats.", usage: "Cook with water/milk for 3 mins.", reviews: [{ id: 1, user: "Aman", rating: 5, date: "1 month ago", comment: "Classic healthy breakfast." }] },
  { id: 21, name: "Whole Oatmeal", brand: "Alpino", price: 299, img: "/oats_alpino.webp", protein: "13g", calories: "390 kcal", servings: "20", inStock: true, flavors: ["Plain"], sizes: ["1.2 kg"], description: "Premium gluten-free rolled oats.", ingredients: "Gluten Free Rolled Oats.", usage: "Soak overnight or cook for 5 mins.", reviews: [{ id: 1, user: "Priya", rating: 4, date: "3 weeks ago", comment: "Great texture." }] },
  { id: 22, name: "Protein Oats with Probiotics", brand: "MuscleXP", price: 450, img: "/mb_protein.webp", protein: "18g", calories: "360 kcal", servings: "10", inStock: true, flavors: ["Masala", "Chocolate"], sizes: ["1 kg"], description: "Oats fortified with probiotics for gut health.", ingredients: "Oats, Plant Protein, Probiotic Blend.", usage: "Cook as desired.", reviews: [{ id: 1, user: "Rakesh", rating: 4, date: "5 days ago", comment: "Masala flavor is surprisingly good." }] },

  // PEANUT BUTTER (23-27)
  { id: 23, name: "High Protein Peanut Butter", brand: "Pintola", price: 699, oldPrice: 899, img: "/peanut_butter_pintola.webp", protein: "10g", calories: "190 kcal", servings: "32", inStock: true, flavors: ["Crunchy Dark Chocolate", "Creamy Vanilla"], sizes: ["1 kg"], description: "Made with roasted peanuts and whey protein.", ingredients: "Roasted Peanuts, Whey Protein Concentrate.", usage: "Spread on toast or add to smoothies.", reviews: [{ id: 1, user: "Sneha R.", rating: 5, date: "1 month ago", comment: "The crunch is amazing." }] },
  { id: 24, name: "Chocolate Peanut Butter", brand: "MyFitness", price: 599, img: "/peanut_butter_myfitness.webp", protein: "8g", calories: "180 kcal", servings: "30", inStock: true, flavors: ["Crispy Chocolate", "Smooth Chocolate"], sizes: ["1.25 kg"], description: "India's favorite chocolate peanut butter.", ingredients: "Roasted Peanuts, Dark Chocolate.", usage: "Eat straight from the jar!", reviews: [{ id: 1, user: "Rohit", rating: 5, date: "2 weeks ago", comment: "Addictive taste." }] },
  { id: 25, name: "Natural Peanut Butter", brand: "Alpino", price: 499, img: "/peanut_butter_alpino.webp", protein: "9g", calories: "200 kcal", servings: "30", inStock: true, flavors: ["Crunchy Unsweetened", "Smooth Unsweetened"], sizes: ["1 kg"], description: "100% roasted peanuts, nothing else.", ingredients: "Roasted Peanuts.", usage: "Mix oil before use. Add to shakes.", reviews: [{ id: 1, user: "Nitin", rating: 5, date: "1 month ago", comment: "Pure and natural." }] },
  { id: 26, name: "Protein Peanut Butter", brand: "MuscleBlaze", price: 549, img: "/peanut_butter_mb.jpeg", protein: "10g", calories: "195 kcal", servings: "25", inStock: true, flavors: ["Crunchy", "Creamy"], sizes: ["750g"], description: "Added whey for 30% protein content.", ingredients: "Peanuts, Whey Protein, Stabilizers.", usage: "Use as a high protein snack.", reviews: [{ id: 1, user: "Aditi", rating: 4, date: "3 weeks ago", comment: "Good macros." }] },
  { id: 27, name: "Crunchy Peanut Butter", brand: "DiSano", price: 349, img: "/peanut_butter.jpg", protein: "8g", calories: "190 kcal", servings: "30", inStock: true, flavors: ["Crunchy"], sizes: ["1 kg"], description: "Affordable and tasty peanut butter.", ingredients: "Peanuts, Sugar, Salt.", usage: "Great for sandwiches.", reviews: [{ id: 1, user: "Gaurav", rating: 4, date: "2 months ago", comment: "Value for money." }] },

  // MASS GAINER (28-31)
  { id: 28, name: "Serious Mass", brand: "Optimum Nutrition", price: 3499, img: "/gainer_Serious_mass.webp", protein: "50g", calories: "1250 kcal", servings: "16", inStock: true, flavors: ["Chocolate", "Vanilla"], sizes: ["6 lbs"], description: "The ultimate weight gain formula.", ingredients: "Maltodextrin, Protein Blend, Vitamin Blend.", usage: "Blend 2 heaping scoops in 24 oz of water.", reviews: [{ id: 1, user: "Tarun", rating: 5, date: "1 week ago", comment: "Gained 3kgs in a month." }] },
  { id: 29, name: "Super Gainer XXL", brand: "MuscleBlaze", price: 2899, img: "/gainer_MuscleBlaze_Super_Gainer_XXL.jpeg", protein: "22.5g", calories: "460 kcal", servings: "30", inStock: true, flavors: ["Chocolate", "Mango"], sizes: ["3 kg"], description: "High calorie formula for rapid size.", ingredients: "Maltodextrin, Whey Protein Concentrate.", usage: "Mix 1 scoop with milk 3 times a day.", reviews: [{ id: 1, user: "Sameer", rating: 4, date: "2 weeks ago", comment: "Mixes thick but tastes good." }] },
  { id: 30, name: "Muscle Mass Gainer", brand: "Labrada", price: 4199, img: "/Whey_protein.png", protein: "52g", calories: "1244 kcal", servings: "14", inStock: true, flavors: ["Chocolate"], sizes: ["6 lbs"], description: "All in one muscle building shake.", ingredients: "Maltodextrin, Cross Flow Microfiltered Whey.", usage: "Mix 1 serving in 32 oz milk.", reviews: [{ id: 1, user: "Vishal", rating: 5, date: "1 month ago", comment: "Labrada is always reliable." }] },
  { id: 31, name: "Super Mass Gainer", brand: "Dymatize", price: 4599, img: "/gainer_Super_Mass_Gainer.webp", protein: "52g", calories: "1280 kcal", servings: "16", inStock: true, flavors: ["Rich Chocolate", "Vanilla"], sizes: ["6 lbs"], description: "Packed with calories, protein, and BCAAs.", ingredients: "Maltodextrin, Protein Blend.", usage: "Mix 2 scoops in 24 oz water.", reviews: [{ id: 1, user: "Deepak", rating: 4, date: "3 weeks ago", comment: "Heavy on the stomach but works." }] },

  // BCAA & GLUTAMINE (32-35)
  { id: 32, name: "Xtend BCAA Powder", brand: "Scivation", price: 2199, img: "/whey.png", protein: "0g", calories: "0 kcal", servings: "30", inStock: true, flavors: ["Mango", "Watermelon"], sizes: ["420g"], description: "7g of BCAAs in the research-proven 2:1:1 ratio.", ingredients: "L-Leucine, L-Isoleucine, L-Valine.", usage: "Mix 1 scoop in 10-14 fl. oz. of water during workout.", reviews: [{ id: 1, user: "Karan", rating: 5, date: "1 week ago", comment: "Mango is the best flavor." }] },
  { id: 33, name: "L-Glutamine Muscle Recovery", brand: "Optimum Nutrition", price: 1499, img: "/Whey_protein.png", protein: "0g", calories: "0 kcal", servings: "60", inStock: true, flavors: ["Unflavored"], sizes: ["300g"], description: "Helps muscle recovery and immune function.", ingredients: "100% Pure L-Glutamine.", usage: "Mix 1 teaspoon in juice post workout.", reviews: [{ id: 1, user: "Vikas", rating: 5, date: "2 months ago", comment: "Essential for recovery." }] },
  { id: 34, name: "BCAA Pro", brand: "MuscleBlaze", price: 1299, img: "/whey.png", protein: "0g", calories: "0 kcal", servings: "30", inStock: true, flavors: ["Green Apple", "Fruit Punch"], sizes: ["250g"], description: "Added Glutamine and Citrulline Malate.", ingredients: "BCAA, L-Glutamine, Citrulline.", usage: "Consume during workout.", reviews: [{ id: 1, user: "Suresh", rating: 4, date: "1 month ago", comment: "Good pump." }] },
  { id: 35, name: "Pro Performance L-Glutamine", brand: "GNC", price: 1199, img: "/Whey_protein.png", protein: "0g", calories: "0 kcal", servings: "50", inStock: true, flavors: ["Unflavored"], sizes: ["250g"], description: "Supports muscle hydration and volume.", ingredients: "L-Glutamine.", usage: "Take 1 scoop after training.", reviews: [{ id: 1, user: "Ajay", rating: 4, date: "3 weeks ago", comment: "Does its job." }] },

  // PROTEIN BARS (36-38)
  { id: 36, name: "Max Protein Daily Bar", brand: "Maxx Protein", price: 720, img: "/proteinbar_maxx_protein.jpeg", protein: "10g", calories: "180 kcal", servings: "6 Bars", inStock: true, flavors: ["Choco Almond", "Choco Berry"], sizes: ["Box of 6"], description: "Healthy daily snack bar.", ingredients: "Protein Blend, Nuts, Chocolate.", usage: "Eat anytime as a snack.", reviews: [{ id: 1, user: "Sanjay", rating: 4, date: "1 week ago", comment: "Good for office cravings." }] },
  { id: 37, name: "20g Protein Bar", brand: "Yogabar", price: 800, img: "/proteinbar_yoga_bar.avif", protein: "20g", calories: "220 kcal", servings: "6 Bars", inStock: true, flavors: ["Chocolate Brownie"], sizes: ["Box of 6"], description: "No added sugar, high protein bar.", ingredients: "Whey Protein, Almonds, Dates.", usage: "Eat post workout or as a meal replacement.", reviews: [{ id: 1, user: "Divya", rating: 5, date: "2 weeks ago", comment: "Very tasty and clean ingredients." }] },
  { id: 38, name: "Atom Protein Bars", brand: "Atom", price: 2500, img: "/proteinbar_atom.jpeg", protein: "20g", calories: "238 kcal", servings: "12 Bars", inStock: true, flavors: ["Caramel Crunch", "Dark Choco Raspberry"], sizes: ["Box of 12"], description: "Great tasting, high protein, low sugar bar.", ingredients: "Protein Blend, Caramel Layer, Sweetener.", usage: "Perfect macro-friendly snack.", reviews: [{ id: 1, user: "Chris", rating: 5, date: "1 month ago", comment: "Best protein bar in the world." }] },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  
  // Find the specific product based on the URL ID
  const product = useMemo(() => productsDB.find(p => p.id === productId), [productId]);

  const [activeTab, setActiveTab] = useState("Description");
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || "Standard");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  // If product ID isn't in our dummy database, show a dark-themed error
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-white mb-4 uppercase">Product Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find the details for this item in the database.</p>
        <button onClick={() => router.push('/shop')} className="bg-bodygold text-darkgray px-8 py-3 font-black rounded-lg hover:bg-yellow-400">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img, flavor: selectedFlavor, quantity: quantity });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-bodygold font-bold mb-8 transition-colors group text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* LEFT: Image Gallery with Zoom (DARK THEME) */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-zoom-in shadow-2xl">
              <Image 
                src={product.img} 
                alt={product.name}
                fill
                priority
                className="object-contain p-12 transition-transform duration-500 group-hover:scale-150 origin-center drop-shadow-2xl"
              />
              <div className="absolute top-6 right-6 bg-[#1a1a1a]/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-gray-300 border border-white/10 uppercase tracking-wider">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* RIGHT: Essential Info & Selection */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-bodygold font-black tracking-widest uppercase text-sm mb-2">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 uppercase">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-bodygold text-bodygold" : "text-gray-700"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500">({product.reviews.length} Customer Reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-white">₹{product.price}</span>
                {product.oldPrice && <span className="text-xl text-gray-600 line-through">₹{product.oldPrice}</span>}
                {product.oldPrice && <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">Save ₹{product.oldPrice - product.price}</span>}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-[#1a1a1a] p-4 rounded-xl text-center border border-white/5">
                  <Zap className="w-5 h-5 text-bodygold mx-auto mb-2" />
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Protein</p>
                  <p className="font-bold text-white">{product.protein}</p>
               </div>
               <div className="bg-[#1a1a1a] p-4 rounded-xl text-center border border-white/5">
                  <Info className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Calories</p>
                  <p className="font-bold text-white">{product.calories}</p>
               </div>
               <div className="bg-[#1a1a1a] p-4 rounded-xl text-center border border-white/5">
                  <Dumbbell className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Servings</p>
                  <p className="font-bold text-white">{product.servings}</p>
               </div>
            </div>

            {/* Flavor Selection */}
            {product.flavors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-black text-white mb-3 uppercase text-xs tracking-wider">Select Flavor</h4>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(f => (
                    <button 
                      key={f} onClick={() => setSelectedFlavor(f)}
                      className={`px-4 py-2 rounded font-bold border transition-all text-sm ${selectedFlavor === f ? "border-bodygold bg-bodygold/10 text-bodygold" : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-8">
                <h4 className="font-black text-white mb-3 uppercase text-xs tracking-wider">Select Size</h4>
                <div className="flex gap-2">
                  {product.sizes.map(s => (
                    <button 
                      key={s} onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded font-bold border transition-all text-sm ${selectedSize === s ? "border-bodygold bg-bodygold/10 text-bodygold" : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-white/10 rounded-lg px-2 bg-[#1a1a1a]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 font-black text-gray-400 hover:text-bodygold transition-colors">-</button>
                <span className="w-10 text-center font-black text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 font-black text-gray-400 hover:text-bodygold transition-colors">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-bodygold text-[#0a0a0a] font-black text-lg h-14 rounded-lg hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,204,0,0.2)] flex items-center justify-center gap-3 active:scale-95 uppercase tracking-wider"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 space-y-4 border border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-bodygold w-5 h-5" />
                <span className="font-bold text-gray-300 text-sm tracking-wide">100% Authentic Product Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-bodygold w-5 h-5" />
                <span className="font-bold text-gray-300 text-sm tracking-wide">Free Delivery in Pune (Same Day)</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="border-t border-white/10 pt-16">
          <div className="flex gap-8 mb-10 border-b border-white/10 overflow-x-auto hide-scrollbar">
            {["Description", "Ingredients", "Usage", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-bodygold" : "text-gray-500 hover:text-gray-300"}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-bodygold rounded-full" />}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "Description" && <p className="text-gray-400 leading-relaxed text-lg max-w-4xl">{product.description}</p>}
                  {activeTab === "Ingredients" && (
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 max-w-4xl">
                      <h4 className="font-black mb-4 flex items-center gap-2 text-white uppercase tracking-wider"><Beaker className="text-bodygold" /> Full Ingredient List</h4>
                      <p className="text-gray-400 leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}
                  {activeTab === "Usage" && (
                     <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 max-w-4xl">
                        <h4 className="font-black mb-4 flex items-center gap-2 text-white uppercase tracking-wider"><Dumbbell className="text-bodygold" /> Preparation & Timing</h4>
                        <p className="text-gray-400 leading-relaxed">{product.usage}</p>
                     </div>
                  )}
                  {activeTab === "Reviews" && (
                    <div className="space-y-8 max-w-4xl">
                      {product.reviews.map(r => (
                        <div key={r.id} className="border-b border-white/5 pb-8">
                          <div className="flex items-center justify-between mb-2">
                             <h5 className="font-black text-white">{r.user} <CheckCircle2 className="inline w-4 h-4 text-bodygold ml-1" /></h5>
                             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{r.date}</span>
                          </div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-bodygold text-bodygold" />)}
                          </div>
                          <p className="text-gray-400 font-medium">{r.comment}</p>
                        </div>
                      ))}
                      <button className="bg-[#1a1a1a] text-white border border-white/10 font-black px-8 py-4 rounded hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-widest text-sm">
                        <MessageSquare className="w-4 h-4" /> Write a Review
                      </button>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}