// Import
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import Layouts
import PageLayout from "../layouts/PageLayout";

// Import Pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import Booking from "../pages/user/Booking";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import UserManage from "../pages/admin/UserManage";
import ProtectRoute from "./ProtectRoute";
import Store from "@/pages/Store";
import ResetPassword from "@/pages/ResetPassword";
import Product from "@/pages/admin/Product";
import Category from "@/pages/admin/Category";
import BookingManage from "@/pages/admin/BookingManage";
import OrderManage from "@/pages/admin/OrderManage";
import Payment from "@/pages/user/Payment";
import UserAccount from "@/pages/UserAccount";
import UserLayout from "@/layouts/UserLayout";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import AdminChat from "@/pages/admin/AdminChat";
import EditProduct from "@/pages/admin/EditProduct";
import ProductDetail from "@/pages/user/ProductDetail";
import UserCart from "@/pages/UserCart";
import Wishlist from "@/pages/Wishlist";
import OrderSuccess from "@/components/order/OrderSuccess";
import PCBuild from "@/pages/PCBuild";
import Promotion from "@/pages/admin/Promotion";
import Purchase from "@/pages/Purchase";

// Import Store

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    // element: <ProtectRoute element={<PageLayout />} allow={["ALL"]} />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/store", element: <Store /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/booking", element: <Booking /> },
      { path: "/pcbuild", element: <PCBuild /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "admin",
    // element: <AdminLayout />,
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "usermng", element: <UserManage /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "category", element: <Category /> },
      { path: "bookingsmng", element: <BookingManage /> },
      { path: "ordermng", element: <OrderManage /> },
      { path: "promotion", element: <Promotion /> },
      { path: "chat", element: <AdminChat /> },
    ],
  },
  {
    path: "user",
    // element: <UserLayout />,
    element: (
      <ProtectRoute element={<UserLayout />} allow={["USER", "ADMIN"]} />
    ),
    children: [
      { index: true, element: <UserAccount /> },
      { path: "cart", element: <UserCart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "payment", element: <Payment /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "purchase", element: <Purchase /> },
    ],
  },
]);

// Export AppRoute
const AppRoute = () => {
  const token = useAuthStore((state) => state.token);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  const fetchUser = async () => {
    await getCurrentUser();
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoute;

// // Routing

// const guestRouter = createBrowserRouter([
//     {
//         path: "/", element: ,
//         children: [
//             { index: true, element: <Home /> },
//             { path: "/register", element: <Register /> },
//             { path: "*", element: <Navigate to="/" /> },
//         ],
//     }
// ]);

// const userRouter = createBrowserRouter([
//     {
//         path: "/", element: <TripLayout />,
//         children: [
//             { index: true, element: <CreateTrip /> },
//             { path: "/home", element: <Home /> },
//             { path: "/user/account", element: <UserAccount /> },
//             { path: "/admin/account", element: <AdminAccount /> },
//             { path: "*", element: <Navigate to="/" /> },
//         ]
//     },
// ])

// // Export AppRoute

// const AppRoute = () => {

//     // State for use authStore
//     const user = useAuthStore((state) => state.user)

//     const finalRouter = user ? userRouter : guestRouter

//     return (
//         <div>
//             <RouterProvider router={finalRouter} />
//         </div>
//     );
// };
