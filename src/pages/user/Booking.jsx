import React from "react";
import FormBooking from "../../components/user/FormBooking";
import BookingList from "../../components/user/BookingList";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

const Booking = () => {
  return (
    <div className="flex flex-col justify-start p-4 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Booking</h1>
  
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + Create Booking
            </button>
          </DialogTrigger>
          
          <DialogContent className="max-w-lg mx-auto p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-2xl font-semibold text-center mb-4">Create a Booking</DialogTitle>
            <FormBooking />
          </DialogContent>
        </Dialog>
      </div>

      {/* แสดงรายการ BookingList */}
      <BookingList />
    </div>
  );
};

export default Booking;
