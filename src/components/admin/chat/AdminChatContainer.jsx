import React, { useContext } from "react";
import AdminChatHeader from "./AdminChatHeader";
import AdminChatBody from "./AdminChatBody";
import AdminChatFooter from "./AdminChatFooter";
import useChatStore from "@/stores/chatStore";
import { SocketContext } from "@/contexts/SocketContext";

function AdminChatContainer() {
  const { adminActiveChat } = useContext(SocketContext);
  // const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  return adminActiveChat ? (
    <div className="absolute flex flex-col w-[20rem] h-[28rem] bottom-0 right-80 bg-slate-400 rounded-tl-md rounded-tr-md">
      <AdminChatHeader />
      <AdminChatBody />
      <AdminChatFooter />
    </div>
  ) : (
    <div className="flex-1 flex flex-col">AdminChat</div>
  );
}

export default AdminChatContainer;
