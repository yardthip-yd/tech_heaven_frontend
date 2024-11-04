import React, { useEffect } from "react";
import useBookingStore from "@/stores/bookingStore";
import useAuthStore from "@/stores/authStore";

const Bookinglist = () => {
  const actionGetBookingByUserId = useBookingStore(
    (state) => state.actionGetBookingByUserId
  );
  const actionUpdateBooking = useBookingStore(
    (state) => state.actionUpdateBooking
  );
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const booking = useBookingStore((state) => state.booking);

  useEffect(() => {
    actionGetBookingByUserId();
  }, [actionGetBookingByUserId]);

  const hdlCancel = async (id) => {
    try {
      await actionUpdateBooking(token, id, { status: "CANCELLED", queuePosition: null });
      actionGetBookingByUserId();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    actionGetBookingByUserId();
  }, [actionUpdateBooking]);

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
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((item, index) => (
            item.status !== "CANCELLED" ? (
              <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {item.user.firstName} {item.user.lastName}
              </td>
              <td className="border border-gray-300 p-2">{item.notes}</td>
              <td className="border border-gray-300 p-2">{item.status}</td>
              <td className="border border-gray-300 p-2">{item.type}</td>
              <td className="border border-gray-300 p-2">
                {new Date(item.bookingDate).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => hdlCancel(item.id)}>Cancel</button>
              </td>
            </tr>
            ) : (
              null
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookinglist;
