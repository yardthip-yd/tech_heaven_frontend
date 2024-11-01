import React, { useContext, useEffect } from "react";
import AppRoute from "./routes/AppRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "./contexts/SocketContext";
import useAuthStore from "./stores/authStore";

const App = () => {
  const socket = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!currentUser) return;
    socket.on("connect", () => {
      // console.log(currentUser);
      console.log("Connected to server");
      // socket.emit("TEST", "TEST");
      socket.emit("identify", {
        user: currentUser,
      });
    });

    socket.on("error", (data) => {
      console.log(data);
    });
    // socket.on("error-" + currentUser.id, (data) => {
    //   console.log(data);
    // });

    socket.on("test", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("error");
    };
  }, [socket, currentUser]);

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_CLIENT_ID}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
        <AppRoute />
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
