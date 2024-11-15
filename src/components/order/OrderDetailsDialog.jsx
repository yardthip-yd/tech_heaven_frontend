import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";

const OrderDetailsDialog = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const actionGetOrderByUserId = useOrderStore((state) => state.actionGetOrderByUserId);
  const orders = useOrderStore((state) => state.orders);
  const token = useAuthStore((state) => state.token);
  
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const totalAmount = selectedOrderItems.reduce((total, item) => {
    const price = parseFloat(item.product?.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return total + (price * quantity);
  }, 0);

  useEffect(() => {
    if (token && order.userId) {
      actionGetOrderByUserId(token, order.userId);
    }
  }, [token, order.userId, actionGetOrderByUserId]);

  useEffect(() => {
    if (orders && order) {
      const selectedOrder = orders.find((item) => item.id === order.id);
      if (selectedOrder) {
        setSelectedOrderItems(selectedOrder.OrderItems || []);
      }
    }
  }, [orders, order]);

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
          <p><strong>Total Amount:</strong> THB {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p><strong>Shipping Address:</strong> {order.orderAddress.address}</p>
          
          <h3 className="text-lg font-semibold">Items Purchased:</h3>
          <ul className="list-disc list-inside space-y-2">
            {selectedOrderItems.length > 0 ? (
              selectedOrderItems.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} x {item.quantity} — {item.product?.price} THB
                </li>
              ))
            ) : (
              <li>No items found for this order.</li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;