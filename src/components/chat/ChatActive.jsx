import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function ChatActive({ setActive }) {
  return (
    <div className="absolute flex flex-col w-72 h-96 bottom-0 right-40 bg-slate-400 rounded-tl-md rounded-tr-md">
      <ChatHeader setActive={setActive} />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default ChatActive;
