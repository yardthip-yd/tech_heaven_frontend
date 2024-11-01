import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ChatFooter() {
  const [sendMessage, setSendMessage] = useState("");
  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };

  return (
    <div className="flex justify-between items-center p-2 gap-2">
      <Input
        type="text"
        placeholder="Type your message here."
        className="flex-1"
        value={sendMessage}
        onChange={handleChange}
      />
      <Button>Send</Button>
    </div>
  );
}

export default ChatFooter;
