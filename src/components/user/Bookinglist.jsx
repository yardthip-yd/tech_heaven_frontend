import React, { useEffect } from "react";
import useBookingStore from "@/stores/bookingStore";
import useAuthStore from "@/stores/authStore";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const BookingList = () => {
  const actionGetBookingByUserId = useBookingStore(
    (state) => state.actionGetBookingByUserId
  );
  const actionUpdateBooking = useBookingStore(
    (state) => state.actionUpdateBooking
  );
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

  return (
    <div className="overflow-x-auto m-4 min-h-[calc(100vh-418px)]">
      <Table className="w-full shadow-md rounded-lg">
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-left w-[150px]">Name</TableHead>
            <TableHead className="font-semibold text-left">Notes</TableHead>
            <TableHead className="font-semibold text-left">Status</TableHead>
            <TableHead className="font-semibold text-left">Type</TableHead>
            <TableHead className="font-semibold text-left">Booking Date</TableHead>
            <TableHead className="font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {booking.map((item, index) =>
            item.status !== "CANCELLED" ? (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {item.user.firstName} {item.user.lastName}
                </TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{new Date(item.bookingDate).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => hdlCancel(item.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList;
