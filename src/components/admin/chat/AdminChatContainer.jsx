import React, { useContext } from "react";
import AdminChatHeader from "./AdminChatHeader";
import AdminChatBody from "./AdminChatBody";
import AdminChatFooter from "./AdminChatFooter";
import useChatStore from "@/stores/chatStore";
import { Card } from "@/components/ui/card";
import { SocketContext } from "@/contexts/SocketContext";

function AdminChatContainer() {
  const { adminActiveChat } = useContext(SocketContext);
  // const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  return adminActiveChat ? (
    <Card className="fixed z-30 right-[340px] bottom-10 border w-[400px] h-[402px] shadow-xl border-slate-100 bg-slate-50 rounded-xl mr-2 flex flex-col justify-between">
      <AdminChatHeader />
      <AdminChatBody />
      <AdminChatFooter />
    </Card>
  ) : (
    <div className="flex-1 flex flex-col text-slate-400">AdminChat</div>
  );
}

export default AdminChatContainer;
