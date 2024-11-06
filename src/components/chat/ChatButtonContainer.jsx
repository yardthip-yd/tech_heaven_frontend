import React, { useContext, useState } from "react";
import ChatButton from "./ChatButton";
import ChatActive from "./ChatActive";
import useAuthStore from "@/stores/authStore";
import ChatSidebar from "../admin/chat/ChatSidebar";
import ChatContainer from "../admin/chat/ChatContainer";
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
      {adminActiveChat && <ChatContainer />}
      {role === "ADMIN" ? (
        active ? (
          <ChatSidebar setActive={setActive} />
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
