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
      const result = await getAllAddress(token, id);
      console.log(result);
      set({ address: result.data });
    } catch (err) {
      console.log(err);
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
