
import { create } from "zustand";



const cartStore = (set,get) => ({

    cartItems: [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      
    addToCart: (item) => {
      const currentItems = get().cartItems;
      const updatedItems = [...currentItems, item];
  
      // Update cart items in the store and localStorage
      set({ cartItems: updatedItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    },
  
    removeFromCart: (id) => {
      const updatedItems = get().cartItems.filter((item) => item.id !== id);
  
      set({ cartItems: updatedItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    },
  
    clearCart: () => {
      set({ cartItems: [] });
      localStorage.removeItem("cartItems");
    },

    removeFromCart: (id) => set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),
    clearCart: () => set({ cartItems: [] }),


    isCheckoutOpen: false,
    setCheckoutOpen: (value) => set({ isCheckoutOpen: value }),


    totalCount: 0, // ค่าเริ่มต้นของ totalCount
    setTotalCount: (count) => set({ totalCount: count }), // ฟังก์ชันสำหรับอัปเดต totalCount
    incrementTotalCount: () => set((state) => ({ totalCount: state.totalCount + 1 })),
    decrementTotalCount: () => set((state) => ({ totalCount: state.totalCount - 1 })),

    cartDetails: [],
    setCartDetails: (details) => set({ cartDetails: details }),

})

const useCartStore = create(cartStore)

export default useCartStore
