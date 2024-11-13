import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { editCoupon, getCoupon } from '@/API/coupon-api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const EditPromotionDialog = ({ isOpen, promotionId, onClose, fetchCoupons }) => {
    const [form, setForm] = useState({
        discount: "",
        startDate: "",
        expiry: "",
        amount: "",
    });

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const response = await getCoupon(promotionId);
                setForm({
                    discount: response.data.discount,
                    startDate: response.data.startDate,
                    expiry: response.data.expiry,
                    amount: response.data.amount
                });
            } catch (error) {
                console.log('Error fetching coupon data:', error);
                toast.error("Failed to load coupon data");
            }
        };

        if (isOpen && promotionId) {
            fetchCoupon();
        }
    }, [isOpen, promotionId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editCoupon(promotionId, form);
            toast.success("Coupon updated successfully");
            onClose();
            fetchCoupons();
        } catch (error) {
            console.log("Error updating coupon:", error);
            toast.error("Failed to update coupon");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
            <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-slate-800">Edit Promotion</DialogTitle>
                <DialogClose onClick={onClose} />
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-slate-700">Discount (%):</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter discount percentage"
                        onChange={handleChange}
                        value={form.discount}
                        name="discount"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Start Date:</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">End Date:</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Coupon Quantity:</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quantity"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 p-4 rounded-lg shadow-md transition duration-200 font-medium">
                    Save Changes
                </Button>
            </form>
        </DialogContent>
    </Dialog>
    )
}


export default EditPromotionDialog;
