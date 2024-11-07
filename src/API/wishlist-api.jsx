import axios from "axios";

export const getWishlist = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/wishlist/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Wishlist fetched:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
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
