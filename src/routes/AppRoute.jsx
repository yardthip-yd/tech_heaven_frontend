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
import BookingManage from "@/pages/admin/BookingManage";
import OrderManage from "@/pages/admin/OrderManage";
import Payment from "@/pages/user/Payment";
import UserAccount from "@/pages/UserAccount";
import UserLayout from "@/layouts/UserLayout";

// Import Store

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    // element: <PageLayout />,
    element: <ProtectRoute element={<PageLayout />} allow={["ALL"]} />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/store", element: <Store /> },
      { path: "/booking", element: <Booking /> },
      { path: "/payment", element: <Payment /> },
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
      { path: "bookingsmng", element: <BookingManage /> },
      { path: "ordermng", element: <OrderManage /> },
    ],
  },
  {
    path: "user",
    // element: <UserLayout />,
    element: <ProtectRoute element={<UserLayout />} allow={["USER", "ADMIN"]} />,
    children: [
      { index: true, element: <UserAccount /> },
    ],
  },
]);

// Export AppRoute
const AppRoute = () => {
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
