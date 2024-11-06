import useAuthStore from "@/stores/authStore";
import React from "react";
import Avatar from "../Avatar";
import moment from "moment";

function ChatMessage(props) {
  const { message: MessageProp } = props;
  console.log(MessageProp);

  const currentUser = useAuthStore((state) => state.user);
  //if todat show only time
  const time = moment(MessageProp.createdAt).format("LT");
  // else show date and time
  const date = moment(MessageProp.createdAt).calendar();
  const isToday = moment(MessageProp.createdAt).isSame(new Date(), "day");

  return (
    <div className="flex flex-col w-full h-full">
      {currentUser.id === MessageProp.userId ? (
        // SENDER
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end max-w-[60%] gap-1">
            {/* MESSAGE */}
            <div className="bg-lime-400 p-1 px-2 rounded-md w-full break-words">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-end">
              {isToday ? (
                <div className="text-xs text-gray-500">{time}</div>
              ) : (
                <div className="text-xs text-gray-500">{date}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // RECEIVER
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start max-w-[60%] gap-1">
            {/* PROFILE */}
            <div className="flex gap-2">
              <Avatar
                imgSrc={MessageProp.user.profileImage}
                className="w-10 h-10 rounded-full flex items-center shadow-lg"
              />
              {/* NAME */}
              <div className="">{MessageProp.user.firstName}</div>
              {MessageProp.user.role === "ADMIN" ? (
                <div className="text-[0.6rem] text-red-500">Admin</div>
              ) : (
                <div className="text-[0.6rem] text-gray-500">User</div>
              )}
            </div>
            {/* MESSAGE */}
            <div className="bg-sky-300 p-1 px-2 rounded-md w-full break-words">
              {MessageProp.message}
            </div>
            {/* TIME */}
            <div className="text-xs text-end">
              {isToday ? (
                <div className="text-xs text-gray-500">{time}</div>
              ) : (
                <div className="text-xs text-gray-500">{date}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
