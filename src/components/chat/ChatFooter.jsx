import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocketContext } from "@/contexts/SocketContext";
import useAuthStore from "@/stores/authStore";
import useChatStore from "@/stores/chatStore";

function ChatFooter() {
  const [sendMessage, setSendMessage] = useState("");
  const socket = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  const chatId = useChatStore((state) => state.chatId);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sendMessage);
    socket.emit("user-send-message", {
      message: sendMessage,
      userId: currentUser.id,
      chatId: chatId,
    });
    setSendMessage("");
  };

  return (
    <div className="flex justify-between items-center p-2 gap-2">
      <Input
        type="text"
        placeholder="Type your message here."
        className="flex-1"
        value={sendMessage}
        onChange={handleChange}
        onKeyPress={handleEnterKey}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
}

export default ChatFooter;
