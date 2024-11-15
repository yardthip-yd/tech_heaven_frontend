import React, { useContext, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { SocketContext } from "@/contexts/SocketContext";
import { Card } from "@/components/ui/card";

function ChatActive({ setActive }) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket]);

  return (
    <Card className="fixed z-30 right-10 bottom-10 border w-[400px] h-[402px] shadow-xl border-slate-100 bg-slate-50 rounded-xl mr-2 flex flex-col justify-between">
      <ChatHeader setActive={setActive} />
      <ChatBody />
      <ChatFooter />
    </Card>
  );
}

export default ChatActive;
