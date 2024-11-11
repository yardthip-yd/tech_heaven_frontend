import React, { useState } from "react";
import useBookingStore from "../../stores/bookingStore";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "@/stores/authStore";
import { DialogClose } from "@/components/ui/dialog";

const FormBooking = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const booking = useBookingStore((state) => state.booking);
  const actionCreateBooking = useBookingStore((state) => state.actionCreateBooking);
  const actionGetAllBookings = useBookingStore((state) => state.actionGetAllBookings);
  
  const [data, setData] = useState({
    bookingDate: null,
    status: "PENDING",
    type: "",
    notes: "",
  });

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hdlDateChange = (date) => {
    setData((prev) => ({
      ...prev,
      bookingDate: date,
    }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const queuePosition = booking.queuePosition;
    if (queuePosition >= 2) {
      return toast.error("Queue is full. Please choose another date and time.");
    }
    try {
      await actionCreateBooking(token, data);
      actionGetAllBookings();
      setData({ bookingDate: null, status: "PENDING", type: "", notes: "" });
      toast.success("Booking created successfully!");
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  return (
    <form className="w-full max-w-lg mx-auto" onSubmit={hdlSubmit}>
      <h2 className="text-lg font-semibold mb-4">
        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
      </h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Booking Type</label>
        <select
          id="type"
          name="type"
          onChange={hdlChange}
          value={data.type}
          className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select</option>
          <option value="CUSTOM_BUILD">Customize</option>
          <option value="REPAIR">Repair</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="bookingDate" className="block text-gray-700 font-medium mb-2">Select Date & Time</label>
        <DatePicker
          id="bookingDate"
          name="bookingDate"
          selected={data.bookingDate}
          onChange={hdlDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Select date and time"
          className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Notes</label>
        <textarea
          id="notes"
          name="notes"
          onChange={hdlChange}
          value={data.notes}
          className="resize-none border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter your notes"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <DialogClose asChild>
          <button
            type="button"
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </DialogClose>
      </div>
    </form>
  );
};

export default FormBooking;
