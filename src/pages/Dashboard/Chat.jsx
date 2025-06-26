import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import Messages from "./Messages";
import Avatar from "../../components/Avatar";
import { UserData } from "../../context/UserDataContext";
import { API_WEB_SOCKET } from "../../config/config";
function Chat() {
  const [isTranslate, setIsTranslate] = useState(false);
  // Here data will come from server (From other users, WebSocket) , messages
  const [chatData, setChatData] = useState({
    sender_id: null,
    receiver_id: null,
    msg: null,
  });

  // only for sending purpose where data sender & receiver can't be change
  const [serverData, setServerData] = useState({
    type: "chat",
    sender_id: null,
    receiver_id: null,
    msg: null,
  });
  const [activeTab, setActiveTab] = useState(false);
  const [users, setUsers] = useState([]);
  const [lastNode, setLastNode] = useState(null);
  const inputRef = useRef();
  const socketRef = useRef(null);
  const usersContainer = useRef();
  const { dataFetched, isFetching, hasNextPage } = useInfiniteScroll({
    fetchFn: (pagePara) => {
      return useFetch(`${API_BASE_URL}/getUsers`, { page: pagePara }, "POST");
    },
    queryKey: ["users_chat"],
    scrollContainer: usersContainer,
    observedEle: lastNode,
    data_id: "student_id",
  });

  const initSocketConnection = (sender_id) => {
    socketRef.current = new WebSocket(API_WEB_SOCKET);

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({ type: "init", sender_id: sender_id })
      );
    };

    socketRef.current.onmessage = (event) => {
      const { msg_id, msg, date, to, from } = JSON.parse(event.data);
      setChatData((prev) => ({
        ...prev,
        msg_id,
        msg,
        date,
        sender_id: from,
        receiver_id: to,
      }));
    };
    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current.close();
    };
  };
  const data_user = useContext(UserData);
  useEffect(() => {
    if (data_user) {
      const userDataArray = data_user?.userData;
      const { student_id } = userDataArray?.[0] ?? { student_id: null };
      setServerData((prev) => ({
        ...prev,
        sender_id: student_id,
      }));

      setChatData((prev) => ({
        ...prev,
        sender_id: student_id,
      }));
    }
  }, [data_user]);

  useEffect(() => {
    setUsers(dataFetched);
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };

  const sendDataToServer = () => {
    socketRef.current.send(JSON.stringify(serverData));
  };

  const handleChange = (e) => {
    setServerData((prev) => ({ ...prev, msg: e.target.value }));
  };

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
        <div className="h-[700px] rounded-sm flex flex-col justify-end border lg:w-10/12 w-full dark:border-borderDark border-borderLight dark:bg-lightDark bg-lightLayout overflow-auto">
          <Messages {...{ ...chatData, currentUserId: serverData.sender_id }} />

          {chatData.receiver_id && (
            <div className="flex items-center gap-3 p-2">
              <input
                ref={inputRef}
                onKeyDown={async (e) => {
                  if (
                    !serverData.sender_id ||
                    !serverData.msg?.trim() ||
                    !serverData.receiver_id
                  )
                    return;

                  if (e.code === "Enter") {
                    sendDataToServer();
                    e.target.value = "";
                  }
                }}
                onChange={handleChange}
                className="dark:text-white text-lightText border dark:border-white dark:border-borderDark border-borderLight w-full h-[49px] rounded-sm"
                type="text"
              />

              <FontAwesomeIcon
                onClick={async () => {
                  if (
                    !serverData.sender_id ||
                    !serverData.msg?.trim() ||
                    !serverData.receiver_id
                  )
                    return;
                  sendDataToServer();
                  inputRef.current.value = "";
                }}
                className="p-4 text-lg text-white  cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition"
                icon={faPaperPlane}
              />
            </div>
          )}
        </div>

        {/*For users to chat with */}
        <div
          ref={usersContainer}
          className={`${
            isTranslate ? "!translate-x-0" : ""
          } transition border dark:border-borderDark border-borderLight h-[700px] w-[350px] lg:relative right-0 absolute dark:bg-lightDark bg-lightLayout overflow-auto max-lg:translate-x-full`}
        >
          {users.map((user) => (
            <User
              ref={users.at(-1) === user ? observeEle : null}
              key={user.student_id}
              id={user.student_id}
              adminId={serverData.sender_id}
              name={`${user.first_name} ${user.last_name}`}
              isActive={user.status_user}
              img={user.image_url}
              setIdServer={setServerData}
              setChatData={setChatData}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              initSocketConnection={initSocketConnection}
              socket={socketRef.current}
            />
          ))}
          {isFetching ? (
            <div className="dark:text-red-300 text-red-600 flex justify-center py-5 animate-syncPuls">
              Loading ...
            </div>
          ) : (
            !hasNextPage && (
              <div className="dark:text-red-300 text-red-600 flex justify-center py-5">
                No more users
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const User = forwardRef(function User(
  {
    id,
    name,
    adminId,
    lastMessage,
    isActive,
    image_url,
    setIdServer,
    setChatData,
    setActiveTab,
    activeTab,
    initSocketConnection,
    socket,
  },
  ref
) {
  return (
    <div
      onClick={() => {
        setIdServer((prev) => ({ ...prev, receiver_id: id }));
        setChatData((prev) => ({
          ...prev,
          receiver_id: id,
          receiver_name: name,
          receiver_image: image_url,
        }));
        setActiveTab(id);
        if (!socket) {
          initSocketConnection(adminId);
        }
      }}
      ref={ref}
      className={`${
        activeTab === id ? "dark:bg-borderDark bg-hoverLight" : ""
      } relative flex items-center gap-3 p-4 border-b dark:border-borderDark border-borderLight dark:hover:bg-borderDark hover:bg-hoverLight transition cursor-pointer`}
    >
      <div
        className={`absolute bottom-4 left-6 rounded-full h-3 w-3 ${
          isActive ? "bg-green-500" : "bg-red-500"
        }  `}
      ></div>
      <Avatar img={image_url} className={`h-[70px] w-[70px]`} />

      <div className="flex flex-col flex-1">
        <div className="dark:text-white text-black">{name ?? "UserName"}</div>
        <div className="text-sm dark:text-gray-400 text-lightText line-clamp-1">
          {lastMessage}
        </div>
      </div>
    </div>
  );
});

export default Chat;
