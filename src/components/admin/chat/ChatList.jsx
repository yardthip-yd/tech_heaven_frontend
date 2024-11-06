import Avatar from "@/components/Avatar";
import { SocketContext } from "@/contexts/SocketContext";
import useAuthStore from "@/stores/authStore";
import useChatStore from "@/stores/chatStore";
import React, { useContext, useEffect, useState } from "react";

function ChatList(props) {
  const { chat } = props;
  // console.log(chat);
  const { socket, chatNotify, setChatNotify, setAdminActiveChat } =
    useContext(SocketContext);

  // const setAdminActiveChat = useChatStore((state) => state.setAdminActiveChat);
  const currentUser = useAuthStore((state) => state.user);

  // const chatNotify = useChatStore((state) => state.chatNotify);
  // console.log(chatNotify);
  // const setChatNotify = useChatStore((state) => state.setChatNotify);
  const [notify, setNotify] = useState(false);

  const hdlOnclick = () => {
    setAdminActiveChat(chat);
    if (chatNotify.length > 0) {
      //remove notify
      const newNotify = chatNotify.filter(
        (item) => item.chatId !== chat.chatId
      );
      setChatNotify(newNotify);

      //emit update notify
      socket.emit("update-chat-notify", {
        chatId: chat.chatId,
        userId: currentUser.id,
      });
    }
  };

  useEffect(() => {
    // console.log(chatNotify);
    const thisNotify = chatNotify.filter((item) => item.chatId === chat.chatId);
    // console.log(thisNotify);
    if (thisNotify.length > 0) {
      // console.log("notify");
      setNotify(true);
    } else {
      // console.log("no notify");
      setNotify(false);
    }
  }, [chatNotify]);

  return (
    <div
      className="flex gap-2 p-1 px-2 bg-slate-400 hover:contrast-125"
      onClick={hdlOnclick}
    >
      {/* PROFILE */}
      <Avatar
        className="w-12 h-12 rounded-full flex items-center shadow-lg"
        imgSrc={chat.user.profileImage}
      />
      {/* NAME */}
      <div className="flex-1">
        <div>{chat.user.firstName + " " + chat.user.lastName}</div>
      </div>
      {/* notify dot */}
      {notify && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
    </div>
  );
}

export default ChatList;
