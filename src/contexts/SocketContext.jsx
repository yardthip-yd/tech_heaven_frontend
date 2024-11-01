import React, { createContext } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = socketIO(import.meta.env.VITE_API);
  //   const socket = socketIO("http://localhost:8000");
  //   console.log("socketContext");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
