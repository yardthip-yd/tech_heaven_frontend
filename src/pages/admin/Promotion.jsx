import React, { useState } from 'react';
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

const Promotion = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');

    const openDialog = (id) => {
        setSelectedPromotionId(id);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedPromotionId(null);
    };

    const handleGenerateCode = () => {
        const newCode = `PROMO${Math.floor(1000 + Math.random() * 9000)}`; // Generate random code
        setGeneratedCode(newCode);
    };

    return (
        <div className="flex flex-row gap-8 mx-auto p-6">
            {/* Promotion Information Card */}
            <Card className="w-full lg:w-1/4 h-auto">
                <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                        <Tag className="h-6 w-6 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-slate-800">Promotion Information</CardTitle>
                    </div>
                    <CardDescription>Generate a new promotion</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-3 flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Promotion Code:</label>
                            {generatedCode && (
                                <p className="my-4 text-blue-600 font-semibold">{generatedCode}</p>
                            )}
                            <Button 
                                className="w-full bg-slate-700 text-white hover:bg-black"
                                onClick={handleGenerateCode}
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
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Start Date:</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">End Date:</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Coupon Quantity:</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter quantity"
                            />
                        </div>
                        <Button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 p-4 rounded-lg shadow-md transition duration-200 font-medium">
                            Add Promotion
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Promotion List Card */}
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
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Edit/Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index} className="hover:bg-slate-50 transition-colors duration-150">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">PROMO{index + 100}</TableCell>
                                    <TableCell className="text-center">{10 + index * 5}%</TableCell>
                                    <TableCell className="text-center">2023-01-01</TableCell>
                                    <TableCell className="text-center">2023-12-31</TableCell>
                                    <TableCell className="text-center">50</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button onClick={() => openDialog(index + 1)} className="p-2 border rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                                                <Pencil className="w-4 h-4 text-blue-500" />
                                            </Button>
                                            <Button variant="outline" className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Promotion Dialog Component */}
            <EditPromotionDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                promotionId={selectedPromotionId}
            />
        </div>
    );
};

export default Promotion;
