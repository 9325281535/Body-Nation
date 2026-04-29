import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  flavor: string;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface AppStore {
  // CART
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, flavor: string) => void;
  updateQuantity: (id: number, flavor: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: () => number;

  // WISHLIST
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: () => number;
}

export const useCartStore = create<AppStore>()(
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
      removeFromCart: (id, flavor) => {
        set({ cart: get().cart.filter((i) => !(i.id === id && i.flavor === flavor)) });
      },
      updateQuantity: (id, flavor, quantity) => {
        if (quantity < 1) return;
        set({ cart: get().cart.map((i) => i.id === id && i.flavor === flavor ? { ...i, quantity } : i) });
      },
      clearCart: () => set({ cart: [] }),
      cartCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),

      // --- WISHLIST LOGIC ---
      wishlist: [],
      toggleWishlist: (item) => {
        const current = get().wishlist;
        const exists = current.find((i) => i.id === item.id);
        if (exists) {
          // If it exists, remove it (Unlike)
          set({ wishlist: current.filter((i) => i.id !== item.id) });
        } else {
          // If it doesn't exist, add it (Like)
          set({ wishlist: [...current, item] });
        }
      },
      isInWishlist: (id) => !!get().wishlist.find((i) => i.id === id),
      wishlistCount: () => get().wishlist.length,
    }),
    { name: 'bodynation-storage' }
  )
);