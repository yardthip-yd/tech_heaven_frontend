import React, { useState } from "react";
import useBookingStore from "../../stores/bookingStore";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "@/stores/authStore";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, ClipboardList, PenLine, User } from "lucide-react";

const FormBooking = ({ onFormSubmit }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const booking = useBookingStore((state) => state.booking);
  const actionCreateBooking = useBookingStore((state) => state.actionCreateBooking);
  const actionGetAllBookings = useBookingStore((state) => state.actionGetAllBookings);

  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    try {
      await actionCreateBooking(token, data);
      actionGetAllBookings();
      setData({ bookingDate: null, status: "PENDING", type: "", notes: "" });
      toast.success("Booking created successfully!");
      onFormSubmit(); // Call the function passed as a prop to close the dialog
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center space-x-2 mb-2">
          <User className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </h2>
        </div>
        <p className="text-sm text-slate-500">Schedule your appointment</p>
      </CardHeader>

      <form onSubmit={hdlSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="inline-flex items-center space-x-2">
              <ClipboardList className="w-4 h-4 text-blue-500" />
              <span>Booking Type</span>
            </Label>
            <select
              id="type"
              name="type"
              onChange={hdlChange}
              value={data.type}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">Select service type</option>
              <option value="CUSTOM_BUILD">Customize</option>
              <option value="REPAIR">Repair</option>
            </select>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label className="inline-flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Select Date & Time</span>
            </Label>
            <DatePicker
              id="bookingDate"
              name="bookingDate"
              selected={data.bookingDate}
              onChange={hdlDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Click to select date and time"
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="inline-flex items-center space-x-2">
              <PenLine className="w-4 h-4 text-blue-500" />
              <span>Notes</span>
            </Label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              onChange={hdlChange}
              value={data.notes}
              className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter any special requirements or notes..."
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Confirm Booking</span>
            )}
          </button>

          <button
            type="button"
            onClick={onFormSubmit} // Close the dialog on cancel
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-black transition-colors duration-200"
          >
            Cancel
          </button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FormBooking;
