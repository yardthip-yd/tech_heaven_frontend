import chatApi from "@/API/chat-api";
import ChatMessage from "@/components/chat/ChatMessage";
import { SocketContext } from "@/contexts/SocketContext";
import useChatStore from "@/stores/chatStore";
import React, { useContext, useEffect, useState } from "react";

function ChatBody() {
  const [messageList, setMessageList] = useState([]);
  const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  const socket = useContext(SocketContext);

  const getMessages = async () => {
    const resp = await chatApi.getChatById(adminActiveChat.chatId);
    // console.log(resp.data);
    setMessageList(resp.data);
  };

  useEffect(() => {
    getMessages();
  }, [adminActiveChat]);

  useEffect(() => {
    socket.on("admin_receive_message", (data) => {
      if (data.chatId !== adminActiveChat.chatId) return;
      setMessageList((prev) => [...prev, data.message]);
    });
    return () => {
      socket.off("admin_receive_message");
    };
  }, [adminActiveChat, socket]);

  return (
    <div className="bg-white flex-1 flex flex-col overflow-y-auto gap-2">
      {messageList.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatBody;
