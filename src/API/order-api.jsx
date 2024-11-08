import axios from "axios";

// USER ORDER
export const createOrder = async (token, payload) => {
    try {
      const response = await axios.post('http://localhost:8000/user/create-order', {
        paymentIntent: payload.paymentIntent,
        token,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response;
    } catch (err) {
      console.error("Error in createOrder:", err);
      throw err;
    }
  };

export const getOrderByUserId = async (token) => {
  return await axios.get("http://localhost:8000/user/get-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ADMIN ORDER
export const getOrderAdmin = async () => {
  return await axios.get("http://localhost:8000/admin/orders");
};

export const changeOrderStatus = async (token, id, data) => {
  return await axios.patch(
    "http://localhost:8000/admin/order-status/" + id,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteOrder = async (token, id) => {
  return await axios.delete("http://localhost:8000/admin/delete-order/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};