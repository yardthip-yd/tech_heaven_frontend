import Avatar from "@/components/Avatar";
import useChatStore from "@/stores/chatStore";
import React from "react";

function ChatList(props) {
  const { chat } = props;
  console.log(chat);

  const setAdminActiveChat = useChatStore((state) => state.setAdminActiveChat);

  const hdlOnclick = () => {
    setAdminActiveChat(chat);
  };

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
      <div>
        <div>{chat.user.firstName + " " + chat.user.lastName}</div>
      </div>
    </div>
  );
}

export default ChatList;
