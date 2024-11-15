import React, { useContext, useEffect } from "react";
import useChatStore from "@/stores/chatStore";
import useAuthStore from "@/stores/authStore";
import { SocketContext } from "@/contexts/SocketContext";
import ChatAvatar from "@/assets/image/icon-customer-service.png";
import { toast } from "react-toastify";

function ChatButton({ setActive }) {
  const { socket, chatNotify, setChatNotify, chatId } =
    useContext(SocketContext);

  // const chatId = useChatStore((state) => state.chatId);
  // const chatNotify = useChatStore((state) => state.chatNotify);
  // const setChatNotify = useChatStore((state) => state.setChatNotify);
  const [notifyNum, setNotifyNum] = React.useState(0);
  const currentUser = useAuthStore((state) => state.user);

  const handleClick = () => {
    if (!currentUser) return toast.error("Please login to chat");
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
    <div className="absolute p-2 pt-3 bottom-16 right-8 flex justify-center items-center hover:cursor-pointer z-20">
      <div
        className="flex flex-col items-center justify-center"
        onClick={handleClick}
      >
        <span className="font-jost font-semibold shadow-2xl px-3 py-1 text-white bg-gradient-to-r  from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 bg-hover rounded-xl ">
          Chat with us
        </span>
        <img
          src={ChatAvatar}
          alt="ChatAvatar"
          className="w-20 h-20 object-contain drop-shadow-2xl"
        />
      </div>

      <div className="relative">
        {notifyNum > 0 && (
          <div className="absolute bg-red-500 w-5 h-5 text-white text-[10px] font-bold rounded-full flex justify-center items-center bottom-[72px] right-[2px]">
            {notifyNum}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatButton;
