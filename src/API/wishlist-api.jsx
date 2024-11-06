import axios from "axios";

export const getWishlist = async (token) => {
  return await axios.get("/api/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToWishlist = async (token, productId) => {
  return await axios.post(
    "/api/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFromWishlist = async (token, productId) => {
  return await axios.delete(`/api/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
