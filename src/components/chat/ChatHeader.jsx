import React from "react";

function ChatHeader(props) {
  const { setActive } = props;
  console.log(props);
  const handleClick = () => {
    console.log("clicked");
    setActive(false);
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div>Admin</div>
      <div className="" onClick={handleClick}>
        X
      </div>
    </div>
  );
}

export default ChatHeader;
