import React, { useContext, useEffect } from "react";
import { ChatIcon } from "../ui/Icon";
import useChatStore from "@/stores/chatStore";
import useAuthStore from "@/stores/authStore";
import { SocketContext } from "@/contexts/SocketContext";

function ChatButton({ setActive }) {
  const { socket, chatNotify, setChatNotify, chatId } =
    useContext(SocketContext);

  // const chatId = useChatStore((state) => state.chatId);
  // const chatNotify = useChatStore((state) => state.chatNotify);
  // const setChatNotify = useChatStore((state) => state.setChatNotify);
  const [notifyNum, setNotifyNum] = React.useState(0);
  const currentUser = useAuthStore((state) => state.user);

  const handleClick = () => {
    setActive(true);
    if (currentUser.role !== "ADMIN") {
      if (chatNotify.length > 0) {
        socket.emit("update-chat-notify", {
          chatId: chatId,
          userId: currentUser.id,
        });
        setChatNotify([]);
      }
    }
  };

  useEffect(() => {
    setNotifyNum(chatNotify.length);
  }, [chatNotify]);

  return (
    <div
      className="absolute p-2 bottom-16 right-16 w-14 h-14 bg-sky-500 rounded-full flex justify-center items-center hover:cursor-pointer"
      onClick={handleClick}
    >
      <ChatIcon />
      <div className="relative">
        {notifyNum > 0 && (
          <div className="absolute bg-red-500 w-[0.8rem] h-[0.8rem] text-white text-[0.7rem] rounded-full flex justify-center items-center bottom-0 right-0">
            {notifyNum}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatButton;
