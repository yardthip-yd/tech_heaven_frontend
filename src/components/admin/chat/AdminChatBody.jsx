import chatApi from "@/API/chat-api";
import ChatMessage from "@/components/chat/ChatMessage";
import { SocketContext } from "@/contexts/SocketContext";
import useChatStore from "@/stores/chatStore";
import React, { useContext, useEffect, useRef, useState } from "react";

function AdminChatBody() {
  const [messageList, setMessageList] = useState([]);
  const [moreMessageList, setMoreMessageList] = useState([]);
  const [loadMessage, setLoadMessage] = useState(false);
  const [skipMessage, setSkipMessage] = useState(0);
  // const adminActiveChat = useChatStore((state) => state.adminActiveChat);
  const { socket, adminActiveChat } = useContext(SocketContext);

  const topChatRef = useRef(null);
  const msgRef = useRef(null);
  const bottomChatRef = useRef(null);

  const scrollToBottom = () => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMsgRef = () => {
    msgRef.current?.scrollIntoView();
  };

  const getMessages = async () => {
    const resp = await chatApi.getChatById(adminActiveChat.chatId);
    // console.log(resp.data);
    setMessageList(resp.data);
    console.log("mes len ", resp.data.length);

    if (resp.data.length < 10) {
      setLoadMessage(false);
    } else {
      setLoadMessage(true);
      setSkipMessage(resp.data.length);
    }

    setTimeout(scrollToBottom, 250);
  };

  const getMoreMessge = async () => {
    const resp = await chatApi.getMoreMessage(
      adminActiveChat.chatId,
      skipMessage
    );
    setMoreMessageList(resp.data);
    if (resp.data.length < 10) {
      setLoadMessage(false);
    } else {
      setLoadMessage(true);
      setSkipMessage((prev) => prev + resp.data.length);
    }
    // setTimeout(scrollToMsgRef, 100);
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && loadMessage) {
      if (moreMessageList.length > 0) {
        setMessageList((prev) => [...moreMessageList, ...prev]);
        setMoreMessageList([]);
      }
      getMoreMessge().then(() => {
        scrollToMsgRef();
      });
    }
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

  return (
    <div
      className="bg-white flex-1 flex flex-col overflow-y-auto gap-2 py-1 px-1"
      onScroll={handleScroll}
    >
      <div ref={topChatRef}></div>
      {moreMessageList.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      <div ref={msgRef}></div>
      {messageList.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      <div ref={bottomChatRef}></div>
      {/* <div className="min-h-[400px] bg-black"></div> */}
    </div>
  );
}

export default AdminChatBody;
