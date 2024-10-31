import React, { useState } from "react";
import useBookingStore from "../stores/bookingStore";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "@/stores/authStore";

const FormBooking = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const { actionCreateBooking } = useBookingStore();
  
  const [data, setData] = useState({
    bookingDate: null, // Initialize with null
    status: "",
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
      bookingDate: date, // Update bookingDate with Date object
    }));
  };


  console.log(data)


  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the action to create the booking
      await actionCreateBooking(token, data);

      // Reset the data state
      setData({
        bookingDate: null, // Reset bookingDate
        status: "",
        type: "",
        notes: "",
      });
      toast.success("Booking created successfully!"); // Optional success message
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      console.log(errMessage);
      toast.error(errMessage);
    }
  };

  return (
    <form className="w-auto m-6" onSubmit={hdlSubmit}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-1/2 h-auto gap-6 px-14 py-6 border flex flex-col justify-start items-center">
          <h1 className="text-3xl font-bold my-6">Booking Form</h1>
          <div className="flex flex-row justify-between w-full">
            <textarea
              name="notes"
              onChange={hdlChange}
              className="resize-none border border-gray-400 w-full p-2"
              placeholder="Enter your notes"
            />
          </div>
          <div className="flex flex-row justify-start w-full">
            <select name="type" onChange={hdlChange} className="border border-gray-400 w-full p-2">
              <option value="">Select</option>
              <option value="CUSTOM_BUILD">Customize</option>
              <option value="REPAIR">Repair</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="timePicker">Select Time: </label>
            <DatePicker
              name="bookingDate"
              selected={data.bookingDate}
              onChange={hdlDateChange} // Use separate handler for date change
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="yyyy-MM-dd'T'HH:mm:ss" // Corrected format
              className="border border-gray-400 w-full h-full mt-2 px-2"
            />
          </div>
          <div className="flex flex-row justify-around w-full">
            <button type="button" className="px-4 py-2 border">Cancel</button>
            <button type="submit" className="px-4 py-2 border">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBooking;
