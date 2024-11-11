import React, { useState } from "react";
import FormBooking from "../../components/user/FormBooking";
import Bookinglist from "../../components/user/Bookinglist";

const Booking = () => {
  const [showFormBooking, setShowFormBooking] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const hdlOpenForm = () => {
    setShowFormBooking(true);
    setShowBooking(false);
  }
  const hdlOpenBooking = () => {
    setShowFormBooking(false);
    setShowBooking(true);
  }
  return (
    <div className="flex flex-col justify-start">
      <h1 className="text-3xl font-bold">Booking</h1>
      <div className="grid grid-cols-2">
        <button
          className="border border-gray-400 w-full"
          onClick={hdlOpenBooking}
        >
          My Bookings
        </button>
        <button className="border border-gray-400 w-full" onClick={hdlOpenForm}>
          Add Booking
        </button>
      </div>
      <div>
        {/* {showFormBooking && <FormBooking />}
        {showBooking && <Bookinglist />} */}
        {!showFormBooking ? <Bookinglist /> : <FormBooking />}
      </div>
    </div>
  );
};

export default Booking;
