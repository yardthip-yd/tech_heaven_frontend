import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocketContext } from "@/contexts/SocketContext";
import useAuthStore from "@/stores/authStore";
import useChatStore from "@/stores/chatStore";
import React, { useContext, useState } from "react";
import { Send } from "lucide-react";

function AdminChatFooter() {
  const [sendMessage, setSendMessage] = useState("");
  const { socket, adminActiveChat } = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  // const AdminActiveChat = useChatStore((state) => state.adminActiveChat);
  //   console.log(currentUser);

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
    // console.log(sendMessage);
    socket.emit("admin-send-message", {
      message: sendMessage,
      userId: currentUser.id,
      chatId: adminActiveChat.chatId,
    });
    setSendMessage("");
  };

  return (
    <div className="relative flex justify-between items-center p-2 gap-2">
      <input
        type="text"
        placeholder="Type your message . . ."
        className="w-full p-2 rounded-full bg-blue-100 placeholder:text-sm placeholder:pl-3"
        value={sendMessage}
        onChange={handleChange}
        onKeyPress={handleEnterKey}
      />
      <div className="absolute p-[8px] rounded-full bg-blue-500 right-[12px]" onClick={handleSubmit}>
        <Send className="h-4 w-4 text-white" />
      </div>
    </div>
  );
}

export default AdminChatFooter;
