import axios from "axios";

export const createBooking = async (token, data) => {
  return await axios.post(
    "http://localhost:8000/booking/create-booking",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllBookings = async (count = 20) => {
  return await axios.get("http://localhost:8000/booking/get-all-bookings/"+count)
}