import React from "react";

function ChatButton({ setActive }) {
  const handleClick = () => {
    setActive(true);
  };
  return (
    <div
      className="absolute bottom-16 right-16 w-14 h-14 bg-red-500 rounded-full flex justify-center items-center"
      onClick={handleClick}
    >
      ChatButton
    </div>
  );
}

export default ChatButton;
