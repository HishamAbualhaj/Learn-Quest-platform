import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ChatStudent() {
  const messages = [
    {
      id: 1,
      name: "Hisham",
      message: "Hello, I need help with my account login issues.",
      isAdmin: false,
    },
    {
      id: 2,
      name: "Admin",
      message:
        "Hi! I’m here to assist you. Can you please describe the issue you're facing?",
      isAdmin: true,
    },
    {
      id: 3,
      name: "Hisham",
      message: "I keep getting an error message saying 'Invalid credentials'.",
      isAdmin: false,
    },
    {
      id: 4,
      name: "Admin",
      message:
        "Have you tried resetting your password? Sometimes that can help.",
      isAdmin: true,
    },
    {
      id: 5,
      name: "Hisham",
      message: "Yes, I tried resetting it, but I still can't log in.",
      isAdmin: false,
    },
    {
      id: 6,
      name: "Admin",
      message:
        "Let me check your account details. Could you provide the email address associated with your account?",
      isAdmin: true,
    },
    {
      id: 7,
      name: "Hisham",
      message: "Sure, it's exampleuser@example.com.",
      isAdmin: false,
    },
    {
      id: 8,
      name: "Admin",
      message: "Thank you! One moment while I look that up.",
      isAdmin: true,
    },
    {
      id: 9,
      name: "Admin",
      message:
        "I've checked, and it seems there was a temporary lock due to multiple failed login attempts. I can help unlock it.",
      isAdmin: true,
    },
    {
      id: 10,
      name: "Hisham",
      message: "Yes, please! That would be great. Thank you!",
      isAdmin: false,
    },
  ];
  return (
    <div className="sm:px-5 px-1">
      <div className="height-vh-adjust">
        <div className="text-4xl font-semibold">Chat</div>
        <div className="mt-3 h-[800px] rounded-sm flex flex-col justify-end border dark:border-borderDark border-borderLight dark:bg-lightDark bg-lightLayout overflow-auto">
          <div className="flex flex-col p-5 gap-5 overflow-auto">
            {messages.map((message) => (
              <Message
                name={message.name}
                key={message.id}
                text={message.message}
                isAdmin={message.isAdmin}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 p-2">
            <input
              className="dark:text-white text-lightText border dark:border-white dark:border-borderDark border-borderLight w-full h-[49px] rounded-sm"
              type="text"
            />
            <FontAwesomeIcon
              className="p-4 text-lg text-white  cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition"
              icon={faPaperPlane}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function Message({ text, name, isAdmin }) {
  return (
    <div className={`flex flex-col ${!isAdmin ? "items-start" : "items-end"} `}>
      <div className="dark:text-white text-lightText text-md ">{name}</div>
      <div
        className={`flex lg:w-1/2 w-fit ${
          !isAdmin ? "dark:bg-blue-400/40 bg-blue-500/90" : "bg-gray-700"
        }  p-2 rounded-md mt-1`}
      >
        <div className="text-white text-start">{text}</div>
      </div>
      <div className="mt-2 text-sm text-gray-400">25 Oct 3:20 PM</div>
    </div>
  );
}
export default ChatStudent;
