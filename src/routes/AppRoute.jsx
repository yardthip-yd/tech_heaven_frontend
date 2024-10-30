
// Import
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Layouts
import PageLayout from "../layouts/PageLayout";


// Import Pages
import Home from "../pages/Home";
import Register from "../pages/Register";


// Import Store


// Routing
const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    }
  ])

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
