import { create } from "zustand";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/API/wishlist-api";

const useWishlistStore = create((set) => ({
  wishlist: [],
  
  actionGetWishlist: async (token) => {
    try {
      const response = await getWishlist(token);
      set({ wishlist: response.data });
      console.log("Fetched wishlist:", response.data); // Log fetched wishlist
    } catch (error) {
      console.error("Failed to fetch wishlist:", error); // Log error
    }
  },
  
  
  actionAddToWishlist: async (token, productId) => {
    try {
      const response = await addToWishlist(token, productId);
      set((state) => ({ wishlist: [...state.wishlist, response.data] }));
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  },
  
  actionRemoveFromWishlist: async (token, productId) => {
    try {
      await removeFromWishlist(token, productId);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.product.id !== productId),
      }));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  },
}));

export default useWishlistStore;
