import React, { useContext, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { SocketContext } from "@/contexts/SocketContext";
import ChatAvatar from "@/assets/image/icon-customer-service.png";

function ChatButton({ setActive }) {
  const { socket, chatNotify, setChatNotify, chatId } = useContext(SocketContext);
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
    <div className="fixed p-2 bottom-4 right-4 flex justify-center items-center cursor-pointer z-50">
      <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3" onClick={handleClick}>
        <span className="font-jost font-semibold shadow-2xl px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm md:text-base text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl">
          Chat with us
        </span>
        <img
          src={ChatAvatar}
          alt="ChatAvatar"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl"
        />
      </div>

      <div className="relative">
        {notifyNum > 0 && (
          <div className="absolute bg-red-500 w-4 h-4 sm:w-5 sm:h-5 text-white text-[8px] sm:text-[10px] md:text-[12px] font-bold rounded-full flex justify-center items-center bottom-[50px] sm:bottom-[60px] md:bottom-[72px] right-[2px]">
            {notifyNum}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatButton;
