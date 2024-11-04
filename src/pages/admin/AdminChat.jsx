import ChatContainer from "@/components/admin/chat/ChatContainer";
import ChatSidebar from "@/components/admin/chat/ChatSidebar";
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
