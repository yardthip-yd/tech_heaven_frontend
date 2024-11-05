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

      // If item is new, add to cart with initial quantity of 1
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

  // Increase quantity of an item
  increaseAmount: (id) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { cartItems: updatedCartItems };
    });
  },

  // Decrease quantity of an item
  decreaseAmount: (id) => {
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
      return { cartItems: updatedCartItems };
    });
  },

  // Manage checkout modal state
  isCheckoutOpen: false,
  setCheckoutOpen: (value) => set({ isCheckoutOpen: value }),

  // Calculate total count of items in the cart
  totalCount: () => {
    return get().cartItems.reduce((count, item) => count + item.quantity, 0);
  },

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
