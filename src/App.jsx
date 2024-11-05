import React, { useContext, useEffect } from "react";
import AppRoute from "./routes/AppRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "./contexts/SocketContext";
import useAuthStore from "./stores/authStore";
import useChatStore from "./stores/chatStore";
import chatApi from "./API/chat-api";

const App = () => {
  const socket = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setChatId = useChatStore((state) => state.setChatId);
  const chatNotify = useChatStore((state) => state.chatNotify);
  const setChatNotify = useChatStore((state) => state.setChatNotify);

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

    handleReceiveIdentify: (data) => {
      // console.log(data);
      setChatId(data.chatId);
    },

    handleReceiveNotify: (data) => {
      console.log(data);
      //check chat notify already exist. if exist, update the notify.
      const chatNotifyIndex = chatNotify.findIndex(
        (notify) => notify.chatId === data.chatId
      );
      if (chatNotifyIndex !== -1) {
        const newNotify = [...chatNotify];
        if (currentUser.role === "ADMIN") {
          if (data.notify.isAdminRead === false) {
            newNotify[chatNotifyIndex] = data.notify;
            setChatNotify(newNotify);
          } else {
            setChatNotify(newNotify.splice(chatNotifyIndex, 1));
          }
        }
        // if user is user
        else {
        }
      } else {
        setChatNotify([...chatNotify, data.notify]);
      }
    },

    handleUpdateChatNotify: (data) => {
      // console.log(data);
      const newNotify = chatNotify.filter((notify) => {
        // console.log(notify);
        return notify.chatId !== data.chatId;
      });
      setChatNotify(newNotify);
    },
  };
  //=====================

  const getChatNotification = async () => {
    try {
      const resp =
        currentUser.role === "ADMIN"
          ? await chatApi.adminGetChatNotify()
          : await chatApi.getChatNotify();
      console.log(resp.data);
      setChatNotify(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChatNotification();
    }
  }, [currentUser]);

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
    socket.on("receive-identify", socketHdlr.handleReceiveIdentify);
    socket.on("chatNotify", socketHdlr.handleReceiveNotify);
    socket.on("updateAdminChatNotify", socketHdlr.handleUpdateChatNotify);

    return () => {
      socket.off("connect", socketHdlr.handleConnect);
      socket.off("error", socketHdlr.handleError);
      socket.off("test", socketHdlr.handleTest);
      socket.off("admin-join-chat-" + currentUser.id, socketHdlr.adminJoinChat);
      socket.off("receive-identify", socketHdlr.handleReceiveIdentify);
      socket.off("chatNotify", socketHdlr.handleReceiveNotify);
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
