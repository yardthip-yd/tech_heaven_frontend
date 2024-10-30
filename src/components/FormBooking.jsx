import React from "react";
import { useState } from "react";
import { createBooking } from "../API/booking-api.jsx";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormBooking = () => {
  const [bookingDate, setBookingDate] = useState(new Date());
  const [data, setData] = useState({
    bookingDate: bookingDate,
    status: "",
    type: "",
    notes: "",
  });

  const hdlChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBooking(token, data);
      console.log(response);
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
            <TextareaAutosize
              name="notes"
              onChange={hdlChange}
              className="resize-none border border-gray-400 w-full p-2"
              placeholder="Enter your notes"
            />
          </div>
          <div className="flex flex-row justify-start w-full">
            <select name="type" onChange={hdlChange}>
              <option value="">Select</option>
              <option value="CUSTOM_BUILD">Customize</option>
              <option value="REPAIR">Repair</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="timePicker">Select Time : </label>
            <DatePicker
              name="bookingDate"
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="border border-gray-400 w-full h-full mt-2 px-2"
            />
          </div>
          <div className="flex flex-row justify-around w-full">
            <button className="px-4 py-2 border">Cancel</button>
            <button className="px-4 py-2 border">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBooking;
