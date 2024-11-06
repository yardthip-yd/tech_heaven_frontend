import React, { createContext, useState } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [chatNotify, setChatNotify] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [newChatNotify, setNewChatNotify] = useState(null);
  const socket = socketIO(import.meta.env.VITE_API, {
    transports: ["websocket", "polling"],
    cors: {
      origin: "*",
    },
  });
  //   const socket = socketIO("http://localhost:8000");
  //   console.log("socketContext");

  return (
    <SocketContext.Provider
      value={{
        socket,
        chatNotify,
        setChatNotify,
        chatId,
        setChatId,
        newChatNotify,
        setNewChatNotify,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
