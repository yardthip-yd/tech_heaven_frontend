import {
  addAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
} from "@/API/address-api";
import { create } from "zustand";

const useAddressStore = create((set, get) => ({
  address: [],
  actionAddAddress: async (token, data) => {
    try {
<<<<<<< HEAD
      console.log("Store receiving data:", { token, data });

      if (!data.address || !data.userId) {
        console.error("Missing required fields:", {
          address: data.address,
          userId: data.userId,
        });
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }

      const payload = {
        address: data.address,
        userId: data.userId,
      };
      console.log(payload)
      const result = await addAddress(token, payload);
      
      console.log(result.data);
      if (result.data) {
        set((state) => ({
          address: [...state.address, result.data],
        }));
        return result.data;
      } else {
        throw new Error("ไม่ได้รับข้อมูลตอบกลับจาก API");
      }
    } catch (err) {
      console.error("Store error:", err);
      throw err;
    }
  },
  actionGetAllAddress: async (token) => {
    try {
      const response = await getAllAddress(token);
      if (response.data) {
        set({ address: response.data });
        return response.data;
      }
    } catch (err) {
      console.error("Error getting addresses:", err);
      throw err;
=======
      console.log(data);
      const result = await addAddress(token, data);
      console.log(result);
      set((state) => ({ address: [...state.address, result.data.created] }));
    } catch (err) {
      console.log(err);
    }
  },
  actionGetAllAddress: async (token, id) => {
    try {
      const response = await getAllAddress(token, id);
      console.log(response);
      set({ address: response.data });
    } catch (err) {
      console.error(err);
>>>>>>> 0a521668673868ba634c00c86584bcccf05c192c
    }
  },
  actionUpdateAddress: async (token, id, data) => {
    try {
      const result = await updateAddress(token, id, data);
      console.log(result);
      set((state) => ({
        address: state.address.map((item) =>
          item.id === id ? { ...item, ...result } : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  },
  actionDeleteAddress: async (token, id) => {
    try {
      const result = await deleteAddress(token, id);
      console.log(result);
      set((state) => ({
        address: state.address.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useAddressStore;
