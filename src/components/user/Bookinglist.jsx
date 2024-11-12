import React, { useEffect } from "react";
import useBookingStore from "@/stores/bookingStore";
import useAuthStore from "@/stores/authStore";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { XCircle } from "lucide-react";

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
  }, [actionGetBookingByUserId, actionUpdateBooking]);

  const hdlCancel = async (id) => {
    try {
      await actionUpdateBooking(token, id, { status: "CANCELLED", queuePosition: null });
      actionGetBookingByUserId();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="p-1 space-y-4 min-h-[calc(100vh-418px)]">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="text-center">
            <TableCaption className="text-slate-500 mt-10">
              A list of your recent bookings.
            </TableCaption>
            <TableHeader className="h-1">
              <TableRow className="bg-slate-100">
                <TableHead className="font-semibold text-slate-700 w-[150px] text-base text-center">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-base text-center">Notes</TableHead>
                <TableHead className="font-semibold text-slate-700 w-[120px] text-base text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-base text-center">Type</TableHead>
                <TableHead className="font-semibold text-slate-700 text-base text-center">
                  Booking Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-center w-[100px] text-base">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {booking?.length > 0 &&
                booking.map((item, index) =>
                  item && item.status && item.status !== "CANCELLED" ? (
                    <TableRow key={index} className="hover:bg-slate-50 transition-colors duration-150 h-14">
                      <TableCell className="font-medium text-slate-900 text-center">
                        {item.user?.firstName || ''} {item.user?.lastName || ''}
                      </TableCell>
                      <TableCell className="text-slate-600 text-center">
                        {item.notes || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 text-center">{item.type}</TableCell>
                      <TableCell className="text-slate-600 text-center">
                        {item.bookingDate ? new Date(item.bookingDate).toLocaleString("th-TH", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }) : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={() => hdlCancel(item.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition-colors duration-150"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
