import chatApi from "@/API/chat-api";
import ChatMessage from "@/components/chat/ChatMessage";
import { SocketContext } from "@/contexts/SocketContext";
import useChatStore from "@/stores/chatStore";
import React, { useContext, useEffect, useRef, useState } from "react";

function ChatBody() {
  const [messageList, setMessageList] = useState([]);
  const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  const socket = useContext(SocketContext);

  const bottomChatRef = useRef(null);

  const scrollToBottom = () => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async () => {
    const resp = await chatApi.getChatById(adminActiveChat.chatId);
    // console.log(resp.data);
    setMessageList(resp.data);
    setTimeout(scrollToBottom, 250);
  };

  useEffect(() => {
    getMessages();
  }, [adminActiveChat]);

  useEffect(() => {
    socket.on("admin_receive_message", (data) => {
      if (data.chatId !== adminActiveChat.chatId) return;
      setMessageList((prev) => [...prev, data.message]);
      setTimeout(scrollToBottom, 250);
    });
    return () => {
      socket.off("admin_receive_message");
    };
  }, [adminActiveChat, socket]);

  return (
    <div className="bg-white flex-1 flex flex-col overflow-y-auto gap-2 py-1">
      {messageList.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      <div ref={bottomChatRef}></div>
    </div>
  );
}

export default ChatBody;
