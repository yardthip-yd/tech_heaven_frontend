import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatActive from "./ChatActive";
import useAuthStore from "@/stores/authStore";
import ChatSidebar from "../admin/chat/ChatSidebar";

function ChatButtonContainer() {
  const [active, setActive] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  const role = currentUser?.role;

  return (
    <>
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
