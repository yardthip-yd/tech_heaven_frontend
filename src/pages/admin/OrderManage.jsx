import React, { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import useOrderStore from "@/stores/orderStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, Package } from "lucide-react";
import { toast } from "react-toastify";

const OrderManage = () => {
  const token = useAuthStore((state) => state.token);
  const actionGetOrderAdmin = useOrderStore((state) => state.actionGetOrderAdmin);
  const actionUpdateOrder = useOrderStore((state) => state.actionUpdateOrder);
  const orders = useOrderStore((state) => state.orders);

  const [searchOrder, setSearchOrder] = useState("");
  const [openDetails, setOpenDetails] = useState({});

  useEffect(() => {
    actionGetOrderAdmin(token);
  }, [token, actionGetOrderAdmin]);

  const handleSearch = (e) => {
    setSearchOrder(e.target.value.toLowerCase());
  };

  const handleToggleDetails = (orderId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await actionUpdateOrder(token, id, { status: newStatus });
      toast.success("Status updated successfully");
      actionGetOrderAdmin(token);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status.");
    }
  };

  const filteredOrders = orders?.filter((order) =>
    order.user.firstName.toLowerCase().includes(searchOrder)
  ) || [];

  return (
    <div className="p-6 mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl font-bold">Manage Orders</CardTitle>
            </div>
            <CardDescription>Manage all user orders, update statuses, or view order details.</CardDescription>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchOrder}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-screen">
            <Table>
              <TableHeader className="h-14 bg-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">#</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Payment Method</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Order not found</TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <TableRow>
                        <TableCell className="text-center font-medium text-slate-700">{index + 1}</TableCell>
                        <TableCell className="text-center text-slate-600">{order.user.firstName}</TableCell>
                        <TableCell className="text-center">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="px-2 py-1 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="REFUNDED">REFUNDED</option>
                            <option value="RETURNED">RETURNED</option>
                            <option value="EXCHANGED">EXCHANGED</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </TableCell>
                        <TableCell className="text-center text-slate-600">{order.paymentMethod}</TableCell>
                        <TableCell className="text-center">
                          <button
                            onClick={() => handleToggleDetails(order.id)}
                            className="flex items-center justify-center space-x-1 mx-auto hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200"
                          >
                            <span className="text-sm font-medium text-blue-500">
                              {openDetails[order.id] ? 'Hide Details' : 'View Details'}
                            </span>
                            {openDetails[order.id] ? (
                              <ChevronUp className="h-4 w-4 text-blue-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-blue-500" />
                            )}
                          </button>
                        </TableCell>
                      </TableRow>
                      {openDetails[order.id] && (
                        <TableRow>
                          <TableCell colSpan={5} className="bg-slate-50">
                            <div className="p-4">
                              <h3 className="font-bold">User Details</h3>
                              <p><strong>Name :</strong> {order.user.firstName} {order.user.lastName}</p>
                              <p><strong>Email :</strong> {order.user.email}</p>
                              <p><strong>Phone :</strong> {order.user.phone}</p>
                              <h3 className="font-bold mt-4">Product Details</h3>
                              {order.OrderItems && order.OrderItems.length > 0 ? (
                                order.OrderItems.map((item, i) => (
                                  <div key={i} className="mb-4">
                                    <p><strong>Product {i + 1}:</strong> {item.product.name}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Price:</strong> ${item.product.price}</p>
                                  </div>
                                ))
                              ) : (
                                <p>No products found.</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManage;
