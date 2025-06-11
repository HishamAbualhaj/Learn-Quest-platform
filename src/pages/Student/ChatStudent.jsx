import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import Messages from "../Dashboard/Messages";
import { UserData } from "../../context/UserDataContext";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
function ChatStudent() {
  // Here data will come from server (From other users, WebSocket) , messages
  const [chatData, setChatData] = useState({
    sender_id: null,
    receiver_id: null,
    msg: null,
  });

  // only for sending purpose where data sender can't be change
  const [serverData, setServerData] = useState({
    type: "chat",
    sender_id: null,
    receiver_id: null,
    msg: null,
  });

  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const { data } = useQuery({
    queryFn: async () => {
      return await useFetch(`${API_BASE_URL}/getAdminId`, null, "GET");
    },
    queryKey: ["admin_id"],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const [{ student_id, first_name, last_name, image_url }] = data?.msg;
      setServerData((prev) => ({
        ...prev,
        receiver_id: student_id,
      }));

      setChatData((prev) => ({
        ...prev,
        receiver_id: student_id,
        receiver_name: `${first_name} ${last_name}`,
        receiver_image: image_url,
      }));
    }
  }, [data]);
  const initSocketConnection = (sender_id) => {
    socketRef.current = new WebSocket("ws://localhost:3002");

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
    if (data_user && !socketRef.current) {
      const userDataArray = data_user?.userData;
      const { student_id, first_name, last_name, image_url } = userDataArray[0];
      setServerData((prev) => ({
        ...prev,
        sender_id: student_id,
      }));

      setChatData((prev) => ({
        ...prev,
        sender_id: student_id,
        sender_name: `${first_name} ${last_name}`,
        sender_image: image_url,
      }));
      initSocketConnection(student_id);
    }
  }, [data_user]);

  const sendDataToServer = () => {
    socketRef.current.send(JSON.stringify(serverData));
  };
  const handleChange = (e) => {
    setServerData((prev) => ({ ...prev, msg: e.target.value }));
  };
  return (
    <div className="sm:px-5 px-1 height-vh-adjust flex items-center">
      <div className="w-full">
        <div className="text-4xl font-semibold">Chat</div>
        <div className="mt-5 h-[750px] rounded-sm flex flex-col justify-end border dark:border-borderDark border-borderLight dark:bg-lightDark bg-lightLayout overflow-auto">
          <div className="flex flex-col p-5 gap-5 overflow-auto">
            <Messages
              {...{ ...chatData, currentUserId: serverData.sender_id }}
            />
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default ChatStudent;
