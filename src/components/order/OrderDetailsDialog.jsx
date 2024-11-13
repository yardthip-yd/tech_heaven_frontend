import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const OrderDetailsDialog = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="p-4 space-y-4">
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString("th-TH")}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Total Amount:</strong> THB {order.totalAmount}</p>
          
          <h3 className="text-lg font-semibold">Items Purchased:</h3>
          <ul className="list-disc list-inside space-y-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.productName} x {item.quantity} — THB {item.price}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
