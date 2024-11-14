import React, { useEffect, useState } from "react";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";

const Purchase = () => {
    const { actionGetOrderByUserId, orders } = useOrderStore();
    const token = useAuthStore((state) => state.token);
    const userId = useAuthStore((state) => state.user.id);
    const [openDetails, setOpenDetails] = useState({});

    useEffect(() => {
        if (token && userId) {
            actionGetOrderByUserId(token, userId);
        }
    }, [token, userId, actionGetOrderByUserId]);

    const handleToggleDetails = (orderId) => {
        setOpenDetails((prevState) => ({
            ...prevState,
            [orderId]: !prevState[orderId],
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-row items-start mb-8 justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-8 w-8 text-slate-700" />
                            <h2 className="text-4xl font-bold text-slate-800">Purchases</h2>
                        </div>
                        <p className="mt-2 text-slate-600">
                            Here you can view the details of your recent orders and their statuses.
                        </p>
                    </div>
                    <Badge variant="outline" className="text-sm mt-2">
                        {orders.length} orders
                    </Badge>
                </div>

                <div className="bg-white p-8 rounded-xl border">
                    <Card>
                        <CardContent className="p-0">
                            <Table className="overflow-y-auto max-h-[80vh]">
                                <TableHeader>
                                    <TableRow className="bg-slate-100">
                                        <TableHead className="font-semibold text-slate-700 w-20 text-center">#</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Date</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Payment Method</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">No products found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        orders.map((order, index) => (
                                            <React.Fragment key={order.id}>
                                                <TableRow>
                                                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                                    <TableCell className="text-center">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-center">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                                                            {order.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-center">{order.paymentMethod}</TableCell>
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
                                            </React.Fragment>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
