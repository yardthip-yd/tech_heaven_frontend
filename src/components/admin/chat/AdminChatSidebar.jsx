import chatApi from "@/API/chat-api";
import React, { useContext, useEffect, useState } from "react";
import AdminChatList from "./AdminChatList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MessagesSquare } from "lucide-react";
import { SocketContext } from "@/contexts/SocketContext";

function AdminChatSidebar({ setActive }) {
  const [chatList, setChatList] = useState([]);
  const { newChatNotify } = useContext(SocketContext);

  const getChatList = async () => {
    const response = await chatApi.getAllChat();
    setChatList(response.data);
  };

  const hdlCollaspse = () => {
    setActive(false);
  };

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    if (newChatNotify) {
      const matchIndex = chatList.findIndex(
        (item) => item.chatId === newChatNotify.chatId
      );

      if (matchIndex !== -1) {
        setChatList((prev) => {
          const newChatList = [...prev];
          newChatList.splice(matchIndex, 1);
          return [newChatNotify.chat, ...newChatList];
        });
      } else {
        setChatList((prev) => [newChatNotify.chat, ...prev]);
      }
    }
  }, [newChatNotify]);

  return (
    <Card className="absolute z-30 right-10 bottom-10 border min-w-[300px] shadow-xl border-slate-100 bg-slate-50">
      <div className="flex justify-between items-center flex-row border-b border-slate-100 shadow-md p-[14px] bg-blue-50">
        <CardTitle className="flex flex-row items-center gap-2 pl-2">
          <MessagesSquare className="w-6 h-6 "/>
          <span className="text-lg font-semibold">Chats</span>
        </CardTitle>
        <div
          onClick={hdlCollaspse}
          className="p-[1px] rounded-md hover:border cursor-pointer duration-200 absolute right-3 top-2"
        >
          <X className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      <div className="flex flex-col max-h-[342px] overflow-y-auto h-screen gap-3 scrollbar-hide">
        {chatList.length === 0 ? (
          <div className="text-slate-500">No chats available</div>
        ) : (
          chatList.map((chat) => (
            <AdminChatList key={chat.id} chat={chat} />
          ))
        )}
      </div>
    </Card>
  );
}

export default AdminChatSidebar;
