import { createBooking, getAllBookings, updateBooking, getBookingByUserId } from "../API/booking-api";
import { create } from "zustand";

const useBookingStore = create((set, get) => ({
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
  actionGetAllBookings: async () => {
    try {
      const booking = get()
      const total = booking.length
      const result = await getAllBookings();
      console.log(result);
      set({ booking: result.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionGetBookingByUserId: async (token, id) => {
    try {
      const result = await getBookingByUserId(token, id);
      console.log(result);
      set({ booking: result.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionUpdateBooking: async (token, id, data) => {
    try {
      const result = await updateBooking(token, id, data);
      console.log(result);
      set((state) => ({
        booking: state.booking.map((item) =>
          item.id === id ? { ...item, ...result } : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useBookingStore;
