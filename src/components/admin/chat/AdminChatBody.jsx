import chatApi from "@/API/chat-api";
import ChatMessage from "@/components/chat/ChatMessage";
import { SocketContext } from "@/contexts/SocketContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

function AdminChatBody() {
  const [messageList, setMessageList] = useState([]);
  const [displayedMessagesCount, setDisplayedMessagesCount] = useState(4);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const { socket, adminActiveChat } = useContext(SocketContext);
  const bottomChatRef = useRef(null);

  const scrollToBottom = () => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async () => {
    const resp = await chatApi.getChatById(adminActiveChat.chatId);
    const allMessages = resp.data;
    setMessageList(allMessages);
    setDisplayedMessagesCount(4);
    setHasMoreMessages(allMessages.length > 2);
    setTimeout(scrollToBottom, 250);
  };

  const loadMoreMessages = () => {
    setDisplayedMessagesCount((prev) => {
      const newCount = prev + 2;
      setHasMoreMessages(newCount < messageList.length);
      return newCount;
    });
  };

  useEffect(() => {
    getMessages();
  }, [adminActiveChat]);

  useEffect(() => {
    socket.on("admin_receive_message", (data) => {
      if (data.chatId !== adminActiveChat.chatId) return;
      setMessageList((prev) => [...prev, data.message]);
      setTimeout(scrollToBottom, 250);
    });
    return () => {
      socket.off("admin_receive_message");
    };
  }, [adminActiveChat, socket]);

  const formatDate = (date) => {
    if (moment(date).isSame(new Date(), "day")) return "Today";
    if (moment(date).isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
    if (moment(date).isSame(new Date(), "year")) return moment(date).format("MMM D");
    return moment(date).format("MMM D, YYYY");
  };

  let lastDisplayedDate = null;

  return (
    <div className="relative flex flex-col overflow-y-auto gap-2 py-2 px-3 scrollbar-hide">
      {hasMoreMessages && (
        <button
          onClick={loadMoreMessages}
          className="text-blue-300 text-sm hover:underline mb-2 self-center"
        >
          See more messages
        </button>
      )}
      {messageList.slice(-displayedMessagesCount).map((message, index) => {
        const messageDate = formatDate(message.createdAt);
        const showDate = lastDisplayedDate !== messageDate;
        lastDisplayedDate = messageDate;

        return (
          <React.Fragment key={message.id}>
            {showDate && (
              <div className="text-center text-xs text-slate-500 my-2">
                {messageDate}
              </div>
            )}
            <ChatMessage message={message} />
          </React.Fragment>
        );
      })}
      <div ref={bottomChatRef}></div>
    </div>
  );
}

export default AdminChatBody;
