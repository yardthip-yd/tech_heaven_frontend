import useAuthStore from "@/stores/authStore";
import React from "react";
import Avatar from "../Avatar";
import moment from "moment";

function ChatMessage(props) {
  const { message: MessageProp } = props;
  const currentUser = useAuthStore((state) => state.user);
  const time = moment(MessageProp.createdAt).format("LT");

  return (
    <div className="flex flex-col w-full h-fit justify-end">
      {currentUser.id === MessageProp.userId ? (
        // SENDER
        <div className="flex items-end ml-auto gap-2">
          <div className="flex flex-col items-end">
            {/* MESSAGE */}
            <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md w-fit break-words">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-slate-400 mt-1">{time}</div>
          </div>
          <Avatar
            imgSrc={MessageProp.user.profileImage}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ) : (
        // RECEIVER
        <div className="flex items-start gap-2">
          <Avatar
            imgSrc={MessageProp.user.profileImage}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            {/* NAME */}
            <div className="text-sm text-slate-700 font-semibold">
              {MessageProp.user.firstName}
            </div>
            {/* MESSAGE */}
            <div className="bg-slate-100 text-slate-900 p-2 rounded-lg shadow-md w-fit break-words">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-slate-400 mt-1">{time}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
