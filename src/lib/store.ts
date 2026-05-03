import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define the Types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
  flavor?: string;
}

interface StoreState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  
  // --- NEW: The Missing Function! ---
  cartTotal: () => number; 
  
  // Wishlist State
  wishlist: any[];
  toggleWishlist: (item: any) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: () => number;
}

// 2. Create the Store
export const useCartStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // --- CART LOGIC ---
      cart: [],
      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i.id === item.id && i.flavor === item.flavor);
        if (existingItem) {
          set({ cart: currentCart.map((i) => i.id === item.id && i.flavor === item.flavor ? { ...i, quantity: i.quantity + item.quantity } : i) });
        } else {
          set({ cart: [...currentCart, item] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => set({ cart: get().cart.map((i) => i.id === id ? { ...i, quantity } : i) }),
      clearCart: () => set({ cart: [] }),
      cartCount: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      
      // --- THE FIX: This calculates the total price of all items in the cart ---
      cartTotal: () => get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),

      // --- WISHLIST LOGIC ---
      wishlist: [],
      toggleWishlist: (item) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.find((i) => i.id === item.id);
        if (exists) {
          set({ wishlist: currentWishlist.filter((i) => i.id !== item.id) });
        } else {
          set({ wishlist: [...currentWishlist, item] });
        }
      },
      isInWishlist: (id) => get().wishlist.some((i) => i.id === id),
      wishlistCount: () => get().wishlist.length,
    }),
    { name: 'bodynation-storage' } // This saves the cart in the browser
  )
);