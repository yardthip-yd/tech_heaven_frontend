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
import { Input } from "@/components/ui/input";
import useAuthStore from "@/stores/authStore";

const BookingManage = () => {
  const token = useAuthStore((state) => state.token);
  const actionGetAllBookings = useBookingStore((state) => state.actionGetAllBookings);
  const actionUpdateBooking = useBookingStore((state) => state.actionUpdateBooking);
  const booking = useBookingStore((state) => state.booking);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Limit items per page

  useEffect(() => {
    actionGetAllBookings();
  }, [actionGetAllBookings]);

  useEffect(() => {
    actionGetAllBookings();
  }, [actionUpdateBooking]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await actionUpdateBooking(token, id, { status: newStatus });
      actionGetAllBookings();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase();
    setSearchName(name);
  };

  const filteredBookings = booking.filter((item) =>
    item.user.firstName.toLowerCase().includes(searchName)
  );

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full mx-4">
      <h1 className="text-3xl font-bold w-full mb-2">User Bookings</h1>
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchName}
        onChange={handleSearch}
        className="w-full"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookings.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.user.firstName}</TableCell>
              <TableCell>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="EXPIRED">EXPIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.notes}</TableCell>
              <TableCell>
                {new Date(item.bookingDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(item.bookingDate).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default BookingManage;
