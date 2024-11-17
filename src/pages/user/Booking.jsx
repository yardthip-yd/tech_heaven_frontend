import React, { useEffect, useState } from "react";
import { Plus, CalendarDays } from "lucide-react";
import FormBooking from "../../components/booking/FormBooking";
import BookingList from "../../components/booking/Bookinglist";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";
import useBookingStore from "@/stores/bookingStore";


const Booking = () => {
  const user = useAuthStore(state => state.user)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = useAuthStore(state => state.token)
  const actionGetBookingByUserId = useBookingStore(state => state.actionGetBookingByUserId)
  console.log(user)
  const handleFormSubmit = () => {
    setIsDialogOpen(false);
  };
  useEffect(()=>{
    // console.log(user,token)
    if(user){
      actionGetBookingByUserId(token,user.id)
    }
  },[user,token])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-10 h-10 text-slate-800" />
              <h2 className="text-4xl font-bold text-slate-800">Bookings</h2>
            </div>
            <p className="mt-2 text-slate-600">Manage your reservations and appointments</p>
          </div>
          <button
            onClick={() => {
              if (!user) {
                return toast.error("Please login to create Booking")
              } else {

                setIsDialogOpen(true)
              }
            }}
            className="inline-flex items-center px-4 py-3 bg-black text-white rounded-full transition-colors duration-200 shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Booking
          </button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
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
