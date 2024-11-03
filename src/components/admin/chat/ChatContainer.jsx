import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import useChatStore from "@/stores/chatStore";

function ChatContainer() {
  const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  return adminActiveChat ? (
    <div className="flex-1 flex flex-col h-96 bg-slate-300 ">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  ) : (
    <div className="flex-1 flex flex-col">AdminChat</div>
  );
}

export default ChatContainer;
