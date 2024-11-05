import chatApi from "@/API/chat-api";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import { Button } from "@/components/ui/button";

function ChatSidebar({ setActive }) {
  const [chatList, setChatList] = useState([]);

  const getChatList = async () => {
    const response = await chatApi.getAllChat();
    // console.log(response);
    setChatList(response.data);
  };

  const hdlCollaspse = () => {
    setActive(false);
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="bg-slate-400 absolute right-10 bottom-10 border-[4px] min-w-[250px] gap-2">
      <div className="flex justify-between items-center px-2">
        <div className="p-2">Chat List:</div>
        <Button className="h-6" onClick={hdlCollaspse}>
          -
        </Button>
      </div>

      {/* ChatList */}
      <div className="flex flex-col overflow-y-auto max-h-[500px]">
        {chatList.map((chat) => (
          <ChatList key={chat.id} chat={chat} />
        ))}
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
        <div className="bg-white min-h-20"></div>
        <div className="bg-black min-h-20"></div>
      </div>
    </div>
  );
}

export default ChatSidebar;
