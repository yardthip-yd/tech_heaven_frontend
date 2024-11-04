
import axios from 'axios';

export const addToCartAPI = async (userId, productId, quantity) => {
  try {
    const response = await axios.post('http://localhost:8000/cart/cart', {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};
