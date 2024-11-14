import React, { useContext, useEffect, useRef } from "react";
import AppRoute from "./routes/AppRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "./contexts/SocketContext";
import useAuthStore from "./stores/authStore";
import useChatStore from "./stores/chatStore";
import chatApi from "./API/chat-api";
import notifySound from "./assets/sound/notify.mp3";

const App = () => {
  const {
    socket,
    chatNotify,
    setChatNotify,
    chatId,
    setChatId,
    setNewChatNotify,
  } = useContext(SocketContext);
  // const { socket } = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  //setup notify sound
  const AudioRef = useRef(new Audio(notifySound));
  const playNotifySound = () => {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    audioContext.resume().then(() => {
      AudioRef.current.currentTime = 0;
      AudioRef.current.play();
    });
  };

  // const setChatId = useChatStore((state) => state.setChatId);
  // const chatNotify = useChatStore((state) => state.chatNotify);
  // const setChatNotify = useChatStore((state) => state.setChatNotify);
  // const chatId = useChatStore((state) => state.chatId);
  // const setNewChatNotify = useChatStore((state) => state.setNewChatNotify);

  // console.log(chatNotify);

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
      console.log("adminJoinChat", data);
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
      // console.log(data);
      if (data.notify.message.user.id !== currentUser.id) {
        // console.log("playNotifySound");
        playNotifySound();
      }
      if (data.notify.isAdminRead === false) {
        setNewChatNotify(data);
      }
      const chatNotifyIndex = chatNotify.findIndex(
        (notify) => notify.chatId === data.chatId
      );
      if (chatNotifyIndex !== -1) {
        const newNotify = [...chatNotify];
        if (currentUser.role === "ADMIN") {
          if (data.notify.isAdminRead === false) {
            // console.log("----1");
            newNotify[chatNotifyIndex] = data.notify;
            // console.log(newNotify);
            setChatNotify(newNotify);
          } else {
            // console.log("----2");
            setChatNotify(newNotify.splice(chatNotifyIndex, 1));
          }
        }
        // if user is user
        else {
          if (data.notify.isRead === false) {
            // console.log("----3");
            newNotify[chatNotifyIndex] = data.notify;
            setChatNotify(newNotify);
          } else {
            // console.log("----4");
            setChatNotify(newNotify.splice(chatNotifyIndex, 1));
          }
        }
      } else {
        // setChatNotify([...chatNotify, data.notify]);
        if (currentUser.role === "ADMIN") {
          if (data.notify.isAdminRead === false) {
            setChatNotify([...chatNotify, data.notify]);
          }
        } else {
          if (data.notify.isRead === false) {
            setChatNotify([...chatNotify, data.notify]);
          }
        }
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
        currentUser?.role === "ADMIN"
          ? await chatApi.adminGetChatNotify()
          : await chatApi.getChatNotify();

      if (resp.data.length > 0) {
        // console.log(resp.data, "CHAT NOTI");
        setChatNotify(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(currentUser, "CHECK USER");
    if (currentUser) {
      getChatNotification();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    // console.log(currentUser.id);
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", socketHdlr.handleConnect);
    socket.on("error", socketHdlr.handleError);
    socket.on("test", socketHdlr.handleTest);
    socket.on("admin-join-chat-" + currentUser.id, socketHdlr.adminJoinChat);
    socket.on("receive-identify", socketHdlr.handleReceiveIdentify);
    socket.on("chatNotify", socketHdlr.handleReceiveNotify);
    // socket.on("updateAdminChatNotify", socketHdlr.handleUpdateChatNotify);

    return () => {
      socket.off("connect", socketHdlr.handleConnect);
      socket.off("error", socketHdlr.handleError);
      socket.off("test", socketHdlr.handleTest);
      socket.off("admin-join-chat-" + currentUser.id, socketHdlr.adminJoinChat);
      socket.off("receive-identify", socketHdlr.handleReceiveIdentify);
      socket.off("chatNotify", socketHdlr.handleReceiveNotify);
      socket.disconnect();
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
