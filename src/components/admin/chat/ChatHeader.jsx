import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import useChatStore from "@/stores/chatStore";
import React from "react";

function ChatHeader() {
  const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  const setAdminActiveChat = useChatStore((state) => state.setAdminActiveChat);
  console.log(adminActiveChat);

  const user = adminActiveChat?.user;

  const hdlBack = () => {
    setAdminActiveChat(null);
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex gap-2 items-center">
        {/* PROFILE */}
        <Avatar
          className="w-12 h-12 rounded-full flex items-center shadow-lg"
          imgSrc={user.profileImage}
        />
        {/* NAME */}
        <div className="font-semibold">
          {user.firstName + " " + user.lastName}
        </div>
      </div>
      {/* BUTTON */}
      <Button onClick={hdlBack}>Back</Button>
    </div>
  );
}

export default ChatHeader;
