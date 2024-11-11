import React, { useState } from "react";
import { Plus, CalendarDays } from "lucide-react";
import FormBooking from "../../components/user/FormBooking";
import BookingList from "../../components/user/BookingList";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const Booking = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-10 h-10 text-slate-800" />
              <h2 className="text-4xl font-bold text-slate-800">Your Bookings</h2>
            </div>
            <p className="mt-2 text-slate-600">Manage your reservations and appointments</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center px-4 py-3 bg-black text-white rounded-full transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Booking
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogTitle className="text-2xl font-semibold text-center">
                Create a New Booking
              </DialogTitle>
              <div>
                <FormBooking onFormSubmit={handleFormSubmit} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <BookingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
