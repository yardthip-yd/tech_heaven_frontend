import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuthStore from "@/stores/authStore";
import useOrderStore from "@/stores/orderStore";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const OrderManage = () => {
  const token = useAuthStore((state) => state.token);
  const actionGetOrderAdmin = useOrderStore(
    (state) => state.actionGetOrderAdmin
  );
  const actionUpdateOrder = useOrderStore((state) => state.actionUpdateOrder);
  const orders = useOrderStore((state) => state.orders);
  const [searchOrder, setSearchOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [openDetails, setOpenDetails] = useState({});
  console.log(openDetails);

  useEffect(() => {
    actionGetOrderAdmin(token);
  }, [token, actionGetOrderAdmin]);

  useEffect(() => {
    actionGetOrderAdmin(token);
  }, [actionUpdateOrder, token]);

  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase();
    setSearchOrder(name);
  };

  const handleToggleDetails = (orderId) => {
    setOpenDetails((prevState) => ({
      // ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await actionUpdateOrder(token, id, { status: newStatus });
      console.log("Status updated successfully");
      actionGetOrderAdmin(token);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrder =
    orders && orders.length > 0
      ? orders.filter((order) =>
          order.user.firstName.toLowerCase().includes(searchOrder)
        )
      : [];

  const orderDisplay =
    filteredOrder.length === 0 ? "Order not found" : filteredOrder;

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrder = filteredOrder.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrder.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-[calc(100%_-_4rem)] mx-4">
      <h1 className="text-3xl font-bold w-full mb-2">User Orders</h1>
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchOrder}
        onChange={handleSearch}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDisplay === "Order not found" ? (
            <TableRow>
              <TableCell colSpan={6}>{orderDisplay}</TableCell>
            </TableRow>
          ) : (
            currentOrder.map((order, index) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{order.user.firstName}</TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
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
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <button>Update Status</button>
                  </TableCell>
                  <TableCell>
                    {openDetails[order.id] ? (
                      <ChevronUp
                        onClick={() => handleToggleDetails(order.id)}
                      />
                    ) : (
                      <ChevronDown
                        onClick={() => handleToggleDetails(order.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>
                    <div
                      style={{
                        maxHeight: openDetails[order.id] ? "500px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      <div>
                        <h3 className="font-bold">User Details</h3>
                        <p>
                          <strong>Name :</strong> {order.user.firstName}{" "}
                          {order.user.lastName}
                        </p>
                        <p>
                          <strong>Email :</strong> {order.user.email}
                        </p>
                        <p>
                          <strong>Phone :</strong> {order.user.phone}
                        </p>

                        <h3 className="font-bold mt-4">Product Details</h3>

                        {order.OrderItems && order.OrderItems.length > 0 ? (
                          order.OrderItems.map((item, index) => (
                            <div key={index} className="mb-4">
                              <p>
                                <strong>Product {index + 1}:</strong> {item.product.name}
                              </p>
                              <p>
                                <strong>Quantity:</strong> {item.quantity}
                              </p>
                              <p>
                                <strong>Price:</strong> ${item.product.price}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No products found.</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default OrderManage;
