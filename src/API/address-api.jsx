import axios from "../config/axios";

export const addAddress = async (token, data) => {
  try {
    const response = await axios.post("/user/address", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const getAllAddress = async (token) => {
  try {
    const response = await axios.get("/user/all-address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const updateAddress = async (token, id, data) => {
  try {
    const response = await axios.patch(`/user/address/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const deleteAddress = async (token, id) => {
  try {
    const response = await axios.delete(`/user/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
