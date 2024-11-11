import React, { useContext, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { SocketContext } from "@/contexts/SocketContext";

function ChatActive({ setActive }) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket]);

  return (
    <div className="absolute flex flex-col w-[20rem] h-[28rem] bottom-0 right-40 bg-slate-400 rounded-tl-md rounded-tr-md">
      <ChatHeader setActive={setActive} />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default ChatActive;
