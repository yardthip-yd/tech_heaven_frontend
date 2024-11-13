import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Pencil, Trash, Tag } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditPromotionDialog from '@/components/admin/EditPromotionDialog';
import { createCoupon, deleteCoupon, getCoupon } from '@/API/coupon-api';

const Promotion = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [generatedCode, setGeneratedCode] = useState("");
    const [form, setForm] = useState({
        name: "",
        expiry: "",
        discount: "",
        amount: "",
        startDate: "",
        status: ""
    });
    const [coupons, setCoupons] = useState([]);

    const openDialog = (id) => {
        setSelectedPromotionId(id);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedPromotionId(null);
    };

    const generateRandomName = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            name: generateRandomName(8)
        }));
    }, []);

    const handleGenerateCode = () => {
        const newCode = generateRandomName(8);
        setGeneratedCode(newCode);
        setForm((prevForm) => ({
            ...prevForm,
            name: newCode
        }));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (couponId) => {
        try {
            await deleteCoupon(couponId); 
            toast.success("Coupon deleted successfully");
            fetchCoupons(); 
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete the coupon");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCoupon(form);
            toast.success('Coupon created successfully');
            fetchCoupons();
            setForm({
                name: generateRandomName(8),
                startDate: '',
                expiry: '',
                discount: '',
                amount: '',
                status: '',
            });
        } catch (error) {
            console.log('Error creating coupon:', error);
            toast.error('Failed to create coupon');
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await getCoupon();
            setCoupons(response.data);
        } catch (error) {
            console.log('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="flex flex-row gap-8 mx-auto p-6">
            <Card className="w-full lg:w-1/4 h-auto">
                <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                        <Tag className="h-6 w-6 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-slate-800">Promotion Information</CardTitle>
                    </div>
                    <CardDescription>Generate a new promotion</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-3 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Promotion Code:</label>
                            {generatedCode && (
                                <p className="my-4 text-blue-600 font-semibold">{generatedCode}</p>
                            )}
                            <Button
                                className="w-full bg-slate-700 text-white hover:bg-black"
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    handleGenerateCode(); 
                                }}
                            >
                                Generate Code
                            </Button>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Discount (%):</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter discount percentage"
                                name="discount"
                                onChange={handleChange}
                                value={form.discount}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Start Date:</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                name="startDate"
                                onChange={handleChange}
                                value={form.startDate}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">End Date:</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                name="expiry"
                                onChange={handleChange}
                                value={form.expiry}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Coupon Quantity:</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter quantity"
                                name="amount"
                                onChange={handleChange}
                                value={form.amount}
                            />
                        </div>
                        <Button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 p-4 rounded-lg shadow-md transition duration-200 font-medium">
                            Add Promotion
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="w-full lg:w-3/4 h-auto">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-800">Promotion Lists</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader className="h-14 bg-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">#</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Promotion Code</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Discount (%)</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Start Date</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">End Date</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Quantity</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Status</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Edit/Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon, index) => (
                                <TableRow key={coupon.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">{coupon.name}</TableCell>
                                    <TableCell className="text-center">{coupon.discount}%</TableCell>
                                    <TableCell className="text-center">{new Date(coupon.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">{new Date(coupon.expiry).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">{coupon.amount}</TableCell>
                                    <TableCell className="text-center">{coupon.status}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button onClick={() => openDialog(coupon.id)} className="p-2 border rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                                                <Pencil className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button onClick={() => handleDelete(coupon.id)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                                                <Trash className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            
                <EditPromotionDialog
                    isOpen={isDialogOpen}
                    promotionId={selectedPromotionId}
                    onClose={closeDialog}
                    fetchCoupons={fetchCoupons}
                />
            
        </div>
    );
};

export default Promotion;
