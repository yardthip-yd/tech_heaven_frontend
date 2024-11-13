import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EditPromotionDialog = ({ isOpen, onClose, promotionId }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-slate-800">Edit Promotion</DialogTitle>
                    <DialogClose onClick={onClose} />
                </DialogHeader>
                <form className="space-y-4">
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
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPromotionDialog;
