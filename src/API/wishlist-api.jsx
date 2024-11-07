import axios from "axios";

export const getWishlist = async (token) => {
  return await axios.get("http://localhost:8000/wishlist/getWishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToWishlist = async (token, productId) => {
  return await axios.post(
    "http://localhost:8000/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFromWishlist = async (token, productId) => {
  return await axios.delete(`http://localhost:8000/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
