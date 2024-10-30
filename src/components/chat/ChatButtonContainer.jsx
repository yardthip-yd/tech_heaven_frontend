import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatActive from "./ChatActive";

function ChatButtonContainer() {
  const [active, setActive] = useState(false);
  return <>{active ? <ChatActive /> : <ChatButton />}</>;
}

export default ChatButtonContainer;
