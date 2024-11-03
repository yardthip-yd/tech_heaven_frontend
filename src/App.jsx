import React, { useContext, useEffect } from "react";
import AppRoute from "./routes/AppRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "./contexts/SocketContext";
import useAuthStore from "./stores/authStore";
import useChatStore from "./stores/chatStore";

const App = () => {
  const socket = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setChatId = useChatStore((state) => state.setChatId);

  //======= SOCKET=======
  const socketHdlr = {
    handleConnect: () => {
      console.log("Connected to server");
      socket.emit("identify", {
        user: currentUser,
      });
    },
    handleError: (data) => {
      console.log(data);
    },

    handleTest: (data) => {
      console.log(data);
    },

    adminJoinChat: (data) => {
      // console.log(data);
      socket.emit("join_chat", {
        userId: currentUser.id,
        chatId: data.chatId,
      });
    },

    handelReceiveIdentify: (data) => {
      // console.log(data);
      setChatId(data.chatId);
    },
  };
  //=====================

  useEffect(() => {
    if (!currentUser) return;
    console.log(currentUser.id);
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", socketHdlr.handleConnect);
    socket.on("error", socketHdlr.handleError);
    socket.on("test", socketHdlr.handleTest);
    socket.on("admin-join-chat-" + currentUser.id, socketHdlr.adminJoinChat);
    socket.on("receive-identify", socketHdlr.handelReceiveIdentify);

    return () => {
      socket.off("connect", socketHdlr.handleConnect);
      socket.off("error", socketHdlr.handleError);
      socket.off("test", socketHdlr.handleTest);
      socket.off("admin-join-chat-" + currentUser.id, socketHdlr.adminJoinChat);
      socket.off("receive-identify", socketHdlr.handelReceiveIdentify);
      socket.disconnect();
    };
  }, [socket, currentUser, token]);

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
