import chatApi from "@/API/chat-api";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";

function ChatSidebar() {
  const [chatList, setChatList] = useState([]);

  const getChatList = async () => {
    const response = await chatApi.getAllChat();
    // console.log(response);
    setChatList(response.data);
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="bg-slate-400 border-[4px] min-w-[250px] gap-2">
      <div className="p-2">Chat List:</div>
      {/* ChatList */}
      <div className="flex flex-col">
        {chatList.map((chat) => (
          <ChatList key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}

export default ChatSidebar;
