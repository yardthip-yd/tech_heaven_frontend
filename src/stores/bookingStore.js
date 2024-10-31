import { createBooking, getAllBookings } from "../API/booking-api";
import { create } from "zustand";

const useBookingStore = create((set) => ({
  booking: [],
  actionCreateBooking: async (token, data) => {
    try {
      console.log(data)
      const result = await createBooking(token, data);
      console.log(result);
      set((state) => ({ booking: [...state.booking, result.data.created] }));
    } catch (err) {
      console.log(err);
    }
  },
  actionGetAllBookings: async (count) => {
    try {
      const result = await getAllBookings(count);
      console.log(result);
      set({ booking: result.data });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useBookingStore;
