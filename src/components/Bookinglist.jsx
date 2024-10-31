import useBookingStore from "@/stores/bookingStore";
import React, { useEffect } from "react";

const Bookinglist = () => {
  const actionGetAllBookings = useBookingStore(
    (state) => state.actionGetAllBookings
  );
  const booking = useBookingStore((state) => state.booking);

  useEffect(() => {
    actionGetAllBookings();
    console.log(booking);
  }, [actionGetAllBookings]);

  return (
    <div className="overflow-x-auto m-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Notes</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.user.firstName} {item.user.lastName}</td>
              <td className="border border-gray-300 p-2">{item.notes}</td>
              <td className="border border-gray-300 p-2">{item.status}</td>
              <td className="border border-gray-300 p-2">{item.type}</td>
              <td className="border border-gray-300 p-2">
                {new Date(item.bookingDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookinglist;
