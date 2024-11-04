import chatApi from "@/API/chat-api";
import { SocketContext } from "@/contexts/SocketContext";
import useAuthStore from "@/stores/authStore";
import React, { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import useChatStore from "@/stores/chatStore";

function ChatBody() {
  const [messageList, setMessageList] = useState([]);
  const currentUser = useAuthStore((state) => state.user);
  const socket = useContext(SocketContext);
  const chatId = useChatStore((state) => state.chatId);

  const getMessages = async () => {
    const resp = await chatApi.getChat();
    // console.log(resp.data);
    setMessageList(resp.data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.chatId !== chatId) return;
      setMessageList((prev) => [...prev, data.message]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket, currentUser]);

  return (
    <div className="bg-white flex-1 flex flex-col overflow-y-auto gap-2">
      {messageList.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatBody;
