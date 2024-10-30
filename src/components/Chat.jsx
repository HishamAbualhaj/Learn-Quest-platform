import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import hisham from "../assets/hisham.jpg";
function Chat() {
  const [isTranslate, setIsTranslate] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handling side effect for screen resize
  useEffect(() => {
    // checking if we are in small screens
    if (windowWidth <= 1280) {
      setIsTranslate(false);
    } else {
      setIsTranslate(true);
    }

    // each time we resize screen,
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth <= 1280) {
        setIsTranslate(false);
      } else {
        setIsTranslate(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

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
  const users = [
    {
      id: 1,
      name: "Hisham",
      lastMessage: "Can you help me with my account issue?",
      isActive: true,
    },
    {
      id: 2,
      name: "Sarah",
      lastMessage: "Thanks for your help!",
      isActive: false,
    },
    {
      id: 3,
      name: "Ali",
      lastMessage: "I’ll try resetting my password.",
      isActive: true,
    },
    {
      id: 4,
      name: "Mona",
      lastMessage: "I’ll get back to you later.",
      isActive: false,
    },
    {
      id: 5,
      name: "Ahmed",
      lastMessage: "Where can I find the settings?",
      isActive: true,
    },
    {
      id: 6,
      name: "Layla",
      lastMessage: "Thank you! That worked.",
      isActive: false,
    },
    {
      id: 7,
      name: "Omar",
      lastMessage: "Please send me the instructions.",
      isActive: true,
    },
    {
      id: 8,
      name: "Noura",
      lastMessage: "Can I call you later?",
      isActive: false,
    },
    {
      id: 9,
      name: "Yousef",
      lastMessage: "Got it, thank you!",
      isActive: true,
    },
    {
      id: 10,
      name: "Fatima",
      lastMessage: "Do I need to update anything?",
      isActive: false,
    },
  ];
  return (
    <div className="flex flex-col relative overflow-hidden">
      <div className="dark:text-white text-lightText text-4xl">Chat</div>
      <FontAwesomeIcon
        onClick={() => {
          setIsTranslate(!isTranslate);
        }}
        className="text-2xl text-white cursor-pointer lg:hidden self-end py-2"
        icon={faBars}
      />
      <div className="flex mt-5 gap-3">
        <div className=" max-h-[700px] rounded-sm flex flex-col justify-end border lg:w-10/12 w-full dark:border-borderDark border-borderLight dark:bg-lightDark bg-lightLayout overflow-auto">
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

        {/*For users to chat with */}
        <div
          className={`${
            isTranslate ? "translate-x-0" : "translate-x-full"
          } transition border dark:border-borderDark border-borderLight h-[700px] w-[350px] lg:relative right-0 absolute dark:bg-lightDark bg-lightLayout overflow-auto`}
        >
          {users.map((user) => (
            <User
              key={user.id}
              name={user.name}
              lastMessage={user.lastMessage}
              isActive={user.isActive}
              img={hisham}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ text, name, isAdmin }) {
  return (
    <div className={`flex flex-col ${isAdmin ? "items-start" : "items-end"} `}>
      <div className="dark:text-white text-lightText text-md ">{name}</div>
      <div
        className={`flex lg:w-1/2 w-fit ${
          isAdmin ? "dark:bg-blue-400/40 bg-blue-500/90" : "bg-gray-700"
        }  p-2 rounded-md mt-1`}
      >
        <div className="text-white text-start">{text}</div>
      </div>
      <div className="mt-2 text-sm text-gray-400">25 Oct 3:20 PM</div>
    </div>
  );
}
function User({ name, lastMessage, isActive, img }) {
  return (
    <div className="relative flex  items-center gap-3 p-4 border-b dark:border-borderDark border-borderLight dark:hover:bg-borderDark hover:bg-hoverLight transition cursor-pointer">
      <div
        className={`absolute bottom-4 left-6 rounded-full h-3 w-3 ${
          isActive ? "bg-green-500" : "bg-red-500"
        }  `}
      ></div>
      <img
        className="rounded-[50%]  h-[70px] w-[70px] object-cover"
        src={img}
        alt=""
      />
      <div className="flex flex-col flex-1">
        <div className="dark:text-white text-black">{name}</div>
        <div className="text-sm dark:text-gray-400 text-lightText line-clamp-1">
          {lastMessage}
        </div>
      </div>
    </div>
  );
}
export default Chat;
