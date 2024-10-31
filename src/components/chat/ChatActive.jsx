import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function ChatActive({ setActive }) {
  return (
    <div className="absolute flex flex-col w-64 h-96 bottom-0 right-10 bg-slate-400">
      <ChatHeader setActive={setActive} />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default ChatActive;
