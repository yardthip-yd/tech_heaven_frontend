import axios from "../config/axios";

export const addAddress = async (token, data) => {
  return await axios.post("user/add-address", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAddress = async (token) => {
  return await axios.get("user/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAddress = async (token, id, data) => {
  return await axios.patch("user/address/" + id, data, {
    headers: {
      Authoriztion: `Bearer ${token}`,
    },
  });
};

export const deleteAddress = async(token, id) => {
    return await axios.delete("user/address/" +id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
