import React, { useEffect, useState } from "react";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import OrderDetailsDialog from "@/components/order/OrderDetailsDialog";
import { Button } from "@/components/ui/button";

const Purchase = () => {
  const { actionGetOrderByUserId, orders } = useOrderStore();
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.user.id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (token && userId) {
      actionGetOrderByUserId(token, userId);
    }
  }, []);

  const getStatusColor = (status) => {
    // เช็คว่า status มีค่าหรือไม่
    if (!status) return 'bg-gray-500/10 text-gray-700';
    
    const statusColors = {
        'pending': 'bg-yellow-500/10 text-yellow-700',
        'processing': 'bg-blue-500/10 text-blue-700',
        'shipped': 'bg-indigo-500/10 text-indigo-700',
        'delivered': 'bg-cyan-500/10 text-cyan-700',
        'cancelled': 'bg-red-500/10 text-red-700',
        'refunded': 'bg-orange-500/10 text-orange-700',
        'returned': 'bg-rose-500/10 text-rose-700',
        'exchanged': 'bg-violet-500/10 text-violet-700',
        'completed': 'bg-green-500/10 text-green-700',
        'succeeded': 'bg-green-500/10 text-green-700' // แก้ไขคำผิด
    };
    
    return statusColors[status.toLowerCase()] || 'bg-gray-500/10 text-gray-700';
};

  const OrderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {orders.length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Order</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {orders.length > 0
              ? new Date(orders[0].createdAt).toLocaleDateString()
              : "-"}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 overflow-y-auto max-h-[80vh]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row items-start mb-8 justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-slate-700" />
              <h2 className="text-4xl font-bold text-slate-800">Purchases</h2>
            </div>
            <p className="mt-2 text-slate-600">
              Here you can view the details of your recent orders and their
              statuses.
            </p>
          </div>
          <Badge variant="outline" className="text-sm mt-2">
            {orders.length} orders
          </Badge>
        </div>

        <div className="bg-white p-8 rounded-xl border">
          <OrderStats />

          <Card>
            <CardContent className="p-0">
              <div className="overflow-y-auto max-h-[80vh]">
                <Table className="w-full">
                  <TableCaption className="text-slate-500 mt-4">
                    Your recent orders.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-slate-100">
                      <TableHead className="font-semibold text-slate-700 w-20 text-center">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">
                        Payment Method
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .slice()
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((order, index) => (
                        <TableRow key={index} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {order.paymentMethod}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                              className="bg-slate-700 hover:bg-black"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <OrderDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          order={selectedOrder}
        />
      </div>
    </div>
  );
};

export default Purchase;