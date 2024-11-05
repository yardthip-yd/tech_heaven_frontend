
import { create } from "zustand";

const cartStore = (set, get) => ({
  cartItems: [],

  // Add to Cart with quantity update if item already exists
  addToCart: (item) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        // If item already exists, update the quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return { cartItems: updatedCartItems };
      }
      // If item is new, add to cart
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    });
  },

  // Remove an item from the cart
  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  // Clear the entire cart
  clearCart: () => set({ cartItems: [] }),

  // Manage checkout modal state
  isCheckoutOpen: false,
  setCheckoutOpen: (value) => set({ isCheckoutOpen: value }),

  // Total count of items in the cart
  totalCount: 0,
  setTotalCount: (count) => set({ totalCount: count }),

  // Increment and decrement total count
  incrementTotalCount: () => set((state) => ({ totalCount: state.totalCount + 1 })),
  decrementTotalCount: () => set((state) => ({ totalCount: Math.max(0, state.totalCount - 1) })),

  // Calculate total price of items in the cart
  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // Cart details (for additional data management, if needed)
  cartDetails: [],
  setCartDetails: (details) => set({ cartDetails: details }),
});

const useCartStore = create(cartStore);

export default useCartStore;
