import ChatContainer from "@/components/admin/chat/AdminChatContainer";
import ChatSidebar from "@/components/admin/chat/AdminChatSidebar";
import React from "react";

function AdminChat() {
  return (
    <div className="flex h-full">
      <ChatContainer />
      <ChatSidebar />
    </div>
  );
}

export default AdminChat;
