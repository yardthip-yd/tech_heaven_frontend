import React from "react";

function ChatHeader(props) {
  const { setActive } = props;
  const handleClick = () => {
    setActive(false);
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div>Contact Admin</div>
      <div className="" onClick={handleClick}>
        X
      </div>
    </div>
  );
}

export default ChatHeader;
