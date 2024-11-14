import React from "react";
import { X, MessagesSquare } from "lucide-react";

function ChatHeader({ setActive }) {
  const handleClick = () => {
    setActive(false);
  };

  return (
    <div className="relative flex justify-between items-center p-2 h-[61.25px] bg-blue-50 rounded-t-lg shadow-md">
      <div className="flex flex-row items-center gap-2 pl-2">
      <MessagesSquare className="w-6 h-6 "/>
      <div className="font-semibold text-slate-700">Support</div>
      </div>
      <div
        onClick={handleClick}
        className="p-[1px] rounded-md hover:border cursor-pointer duration-200"
      >
        <X className="w-4 h-4 text-slate-600" />
      </div>
    </div>
  );
}

export default ChatHeader;
