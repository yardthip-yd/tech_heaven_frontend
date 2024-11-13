import Avatar from "@/components/Avatar";
import { SocketContext } from "@/contexts/SocketContext";
import useAuthStore from "@/stores/authStore";
import React, { useContext, useEffect, useState } from "react";
import { BellDot, ChevronLeft } from "lucide-react";

function AdminChatList(props) {
  const { chat } = props;
  const { socket, chatNotify, setChatNotify, setAdminActiveChat } = useContext(SocketContext);
  const currentUser = useAuthStore((state) => state.user);
  const [notify, setNotify] = useState(false);

  const hdlOnclick = () => {
    setAdminActiveChat(chat);
    if (chatNotify.length > 0) {
      const newNotify = chatNotify.filter((item) => item.chatId !== chat.chatId);
      setChatNotify(newNotify);
      socket.emit("update-chat-notify", { chatId: chat.chatId, userId: currentUser.id });
    }
  };

  useEffect(() => {
    const thisNotify = chatNotify.some((item) => item.chatId === chat.chatId);
    setNotify(thisNotify);
  }, [chatNotify]);

  return (
    <div 
      className="relative  flex py-2 items-center gap-4 p-2 px-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-200 group"
      onClick={hdlOnclick}
    >
      {/* ChevronLeft Icon */}
      <ChevronLeft className="absolute w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-1" />
      
      {/* Profile Avatar */}
      <div className="flex gap-2 items-center flex-1 ml-2">
        <Avatar className="w-10 h-10 rounded-full" imgSrc={chat.user.profileImage} />
        
        {/* User Name */}
        <div className="flex-1">
          <div className="text-slate-700 font-semibold">{chat.user.firstName + " " + chat.user.lastName}</div>
        </div>
      </div>
      
      {/* Notification Icon */}
      {notify && <BellDot className="w-5 h-5 text-blue-500 mr-2" />}
    </div>
  );
}

export default AdminChatList;
