import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { SocketContext } from "@/contexts/SocketContext";
import useChatStore from "@/stores/chatStore";
import React, { useContext } from "react";
import { ChevronRight } from "lucide-react";

function AdminChatHeader() {
  const { adminActiveChat, setAdminActiveChat } = useContext(SocketContext);
  // const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  // const setAdminActiveChat = useChatStore((state) => state.setAdminActiveChat);
  // console.log(adminActiveChat);

  const user = adminActiveChat?.user;

  const hdlBack = () => {
    setAdminActiveChat(null);
  };

  return (
    <div className="relative flex justify-between items-center p-2 h-[61.25px] bg-blue-500 rounded-t-lg shadow-md">
      <div className="flex gap-2 items-center text-white">
        {/* PROFILE */}
        <Avatar
          className="w-10 h-10 rounded-full flex items-center"
          imgSrc={user.profileImage}
        />
        {/* NAME */}
        <div className="font-semibold">
          {user.firstName + " " + user.lastName}
        </div>
      </div>
      {/* BUTTON */}
      <div
        className="flex flex-row gap-1 items-center text-white hover:cursor-pointer"
        onClick={hdlBack}
      >
        <span className="text-sm">Back</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}

export default AdminChatHeader;
