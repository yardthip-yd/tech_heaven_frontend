import useAuthStore from "@/stores/authStore";
import React from "react";
import Avatar from "../Avatar";

function ChatMessage(props) {
  const { message: MessageProp } = props;
  console.log(MessageProp);

  const currentUser = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col w-full h-full">
      {currentUser.id === MessageProp.userId ? (
        // SENDER
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end max-w-[60%]">
            {/* MESSAGE */}
            <div className="bg-lime-400 p-1 px-2 rounded-md text-wrap">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-end">{MessageProp.createdAt}</div>
          </div>
        </div>
      ) : (
        // RECEIVER
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start max-w-[60%] gap-2">
            {/* PROFILE */}
            <div className="flex gap-2">
              <Avatar
                imgSrc={MessageProp.user.profileImage}
                className="w-10 h-10 rounded-full flex items-center shadow-lg"
              />
              <div className="">{MessageProp.user.firstName}</div>
            </div>
            {/* MESSAGE */}
            <div className="bg-sky-300 p-1 px-2 rounded-md text-wrap">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-end">{MessageProp.createdAt}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
