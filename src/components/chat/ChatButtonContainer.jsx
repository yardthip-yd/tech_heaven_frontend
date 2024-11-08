import React, { useContext, useState } from "react";
import ChatButton from "./ChatButton";
import ChatActive from "./ChatActive";
import useAuthStore from "@/stores/authStore";
import AdminChatSidebar from "../admin/chat/AdminChatSidebar";
import AdminChatContainer from "../admin/chat/AdminChatContainer";
import useChatStore from "@/stores/chatStore";
import { SocketContext } from "@/contexts/SocketContext";

function ChatButtonContainer() {
  const { adminActiveChat } = useContext(SocketContext);
  const [active, setActive] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  // const adminActiveChat = useChatStore((state) => state.adminActiveChat);

  const role = currentUser?.role;

  return (
    <>
      {adminActiveChat && <AdminChatContainer />}
      {role === "ADMIN" ? (
        active ? (
          <AdminChatSidebar setActive={setActive} />
        ) : (
          <ChatButton setActive={setActive} />
        )
      ) : active ? (
        <ChatActive setActive={setActive} />
      ) : (
        <ChatButton setActive={setActive} />
      )}
    </>
  );
}

export default ChatButtonContainer;
