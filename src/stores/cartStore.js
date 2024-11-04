
import { create } from 'zustand';
import { addToCartAPI } from '@/API/cart-api'; 

const useCartStore = create((set) => ({
  cart: [],
  loading: false,
  error: null,

  actionAddToCart: async (userId, productId, quantity) => {
    set({ loading: true, error: null });
    try {
      const cartItem = await addToCartAPI(userId, productId, quantity);
      set((state) => ({
        cart: [...state.cart, cartItem],
        loading: false,
      }));
      console.log('Product added to cart successfully:', cartItem);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCartStore;
