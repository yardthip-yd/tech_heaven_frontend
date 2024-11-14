
import {  createUserCart, getCart } from "@/API/cart-api";
import { applyCoupon } from "@/API/coupon-api";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const cartStore = (set, get) => ({
  // Initialize cartItems from localStorage or as an empty array
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],

  // Add an item to the cart and update localStorage
  addToCart: (item) => {
    const currentItems = get().cartItems;
    const existingItem = currentItems.find((i) => i.id === item.id);
   
    let updatedItems;
    if (existingItem) {
      // If item already in cart, increase its quantity
      updatedItems = currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      // If item is new, add it with an initial quantity of 1
      updatedItems = [...currentItems, { ...item, quantity: 1 }];
    }
    
    console.log(updatedItems)
    set({ cartItems: updatedItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  },

  // Remove an item from the cart and update localStorage
  removeFromCart: (id) => {
    const updatedItems = get().cartItems.filter((item) => item.id !== id);
    set({ cartItems: updatedItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  },

  // Clear all items from the cart and remove from localStorage
  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cartItems");
  },

  // Increase quantity of an item and update localStorage
  increaseAmount: (id) => {
    const updatedCartItems = get().cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  },

  // Decrease quantity of an item and remove if quantity becomes 0, then update localStorage
  decreaseAmount: (id) => {
    const updatedCartItems = get()
      .cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);

    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
  cartTotal : 0,
  discount : 0,
  setCartDetails: (details) => set({ cartDetails: details }),

  getCart1 : async(userId) => {
    
    const cartItem = await getCart(userId)
    console.log(cartItem.data.cart)
    set({cartTotal : cartItem.data.cart.total}) 
    const data = cartItem.data.cart.CartItems.map((item)=> 
      {
        item.product.quantity = item.quantity
       return item.product
      })
    // console.log(data)
    set({cartItems : data})
  },


  applyCoupon1 : async(promotionCode) => {
    try {
      const response = await applyCoupon(promotionCode);
      console.log(response.data)
      const discount = response.data?.discount; 
      set({ discount: discount });
      return { discount };
    } catch (err) {
      console.log("Error applying coupon:", err);
      
    }
  },
  
  createCart : async(cartData) => {
    const cart = await createUserCart(cartData) 
    console.log(cart.data)
    set({discount : 0})
  }

});
  
const useCartStore = create(persist(cartStore,{name : "coupon"}));

export default useCartStore;
