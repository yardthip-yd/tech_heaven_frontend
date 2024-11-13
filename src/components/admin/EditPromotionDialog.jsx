import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { editCoupon, getCoupon } from '@/API/coupon-api';

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
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4">Edit Coupon</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-sm font-medium">Discount (%):</label>
                        <input
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium">Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium">End Date:</label>
                        <input
                            type="date"
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium">Coupon Quantity:</label>
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPromotionDialog;
