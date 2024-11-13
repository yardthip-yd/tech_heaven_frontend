import React, { useEffect, useState } from "react";
import useBookingStore from "@/stores/bookingStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash, CalendarDays } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";

const BookingManage = () => {
  const token = useAuthStore((state) => state.token);
  const actionGetAllBookings = useBookingStore(
    (state) => state.actionGetAllBookings
  );
  const actionUpdateBooking = useBookingStore(
    (state) => state.actionUpdateBooking
  );
  const actionDeleteBooking = useBookingStore(
    (state) => state.actionDeleteBooking
  );
  const booking = useBookingStore((state) => state.booking);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    actionGetAllBookings();
  }, [actionGetAllBookings]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await actionUpdateBooking(token, id, { status: newStatus });
      actionGetAllBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking status.");
    }
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await actionDeleteBooking(token, id);
      toast.success("Booking deleted successfully");
      actionGetAllBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking.");
    }
  };

  const filteredBookings = booking.filter((item) =>
    item.user.firstName.toLowerCase().includes(searchName)
  );

  return (
    <div className="p-6 mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl font-bold">Manage Bookings</CardTitle>
            </div>
            <CardDescription>Manage all user bookings, update statuses, or remove bookings.</CardDescription>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-screen">
            <Table>
              <TableHeader className="h-14 bg-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">#</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Note</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Time</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <TableCell className="text-center font-medium text-slate-700">{index + 1}</TableCell>
                    <TableCell className="text-center text-slate-600">{item.user.firstName}</TableCell>
                    <TableCell className="text-center">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="px-2 py-1 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="EXPIRED">EXPIRED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </TableCell>
                    <TableCell className="text-center text-slate-600">{item.type}</TableCell>
                    <TableCell className="text-center text-slate-600">{item.notes}</TableCell>
                    <TableCell className="text-center text-slate-600">
                      {new Date(item.bookingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center text-slate-600">
                      {new Date(item.bookingDate).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={item.status === "PENDING"}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                      >
                        <Trash className="w-5 h-5 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManage;
