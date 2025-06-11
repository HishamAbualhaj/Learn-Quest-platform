import { useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import Avatar from "../../components/Avatar";
import { useQueryClient } from "@tanstack/react-query";

function Messages({
  msg_id,
  sender_id,
  receiver_id,
  msg,
  date,
  currentUserId,
  sender_name,
  sender_image,
  receiver_name,
  receiver_image,
}) {
  const [messages, setMessages] = useState([]);
  const [lastNode, setLastNode] = useState(null);
  const queryClient = useQueryClient();
  const msgContainer = useRef(null);

  const { dataFetched, isFetching, refetch } = useInfiniteScroll({
    fetchFn: async (pagePara) => {
      if (!sender_id && !receiver_id) return;
      return await useFetch(
        `${API_BASE_URL}/getMsg`,
        { page: pagePara, ...{ sender_id, receiver_id } },
        "POST"
      );
    },
    queryKey: ["messages", sender_id, receiver_id],
    scrollContainer: msgContainer,
    observedEle: lastNode,
    data_id: "msg_id",
  });

  useEffect(() => {
    setMessages([]);
    if (receiver_id && !isFetching) {
      refetch();
    }
  }, [receiver_id]);

  useEffect(() => {
    if (!msg) return;
    // append the UI for this msg
    setMessages((prev) => [
      ...prev,
      {
        msg_id: msg_id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        msg_text: msg,
        created_date: date,
      },
    ]);

    // add new msg to query array, so when we fetch new data it will never disappear
    queryClient.setQueryData(["messages", sender_id, receiver_id], (oldMsg) => {
      if (!oldMsg) return;

      const { msg: msgApiData = null } = oldMsg?.pages?.at(0);

      const dataWithNewMsg = [
        {
          msg_id: msg_id,
          sender_id: sender_id,
          receiver_id: receiver_id,
          msg_text: msg,
          created_date: date,
        },
        ...msgApiData,
      ];

      return {
        ...oldMsg,
        pages: [
          { ...oldMsg?.pages?.at(0), msg: dataWithNewMsg },
          ...oldMsg?.pages?.slice(1),
        ],
      };
    });
  }, [msg_id]);

  const prevScrollHeight = useRef(0);
  useEffect(() => {
    const arr = [...dataFetched];
    setMessages(arr.reverse());

    prevScrollHeight.current = msgContainer.current.scrollHeight;
  }, [dataFetched, dataFetched?.pages?.[0]?.msg]);

  useEffect(() => {
    if (msgContainer.current && messages.length <= 10) {
      msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
    } else {
      const container = msgContainer.current;
      container.scrollTop = container.scrollHeight - prevScrollHeight.current;
    }
  }, [messages]);

  const observeEle = (node) => {
    setLastNode(node);
  };

  function formatDateForUX(dateStr) {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // For AM/PM format
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <div ref={msgContainer} className="flex flex-col p-5 gap-5 overflow-auto">
      {isFetching && (
        <>
          <div className="flex flex-col">
            <div className="flex lg:w-1/2 w-fit h-[40px] bg-gray-700 animate-syncPuls p-2 rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex lg:w-1/2 w-fit h-[40px] bg-gray-700 p-2 animate-syncPuls rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex lg:w-1/2 w-fit h-[40px] bg-gray-700 animate-syncPuls p-2 rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex lg:w-1/2 w-fit h-[40px] bg-gray-700 p-2 animate-syncPuls rounded-md mt-1"></div>
          </div>
        </>
      )}

      {receiver_id ? (
        !isFetching &&
        (messages.length === 0 ? (
          <div className="text-xl flex justify-center dark:text-white text-lightDark">
            No Chat data for this user
          </div>
        ) : (
          <></>
        ))
      ) : (
        <div className="text-2xl flex justify-center dark:text-white text-lightDark">
          Select Chat
        </div>
      )}
      {receiver_id &&
        messages.map((message) => (
          <div
            key={message?.msg_id}
            ref={messages[0] === message ? observeEle : null}
            className={`flex flex-col ${
              message?.sender_id === currentUserId ? "items-start" : "items-end"
            } `}
          >
            <div className="dark:text-white text-lightText text-sm">
              {message?.sender_id === currentUserId
                ? sender_name
                : receiver_name}
            </div>
            <div
              className={`flex mt-2 items-center gap-2 ${
                message?.sender_id === currentUserId ? "" : "flex-row-reverse"
              }`}
            >
              <Avatar
                img={
                  message?.sender_id === currentUserId
                    ? sender_image
                    : receiver_image
                }
                className={`h-[40px] w-[40px]`}
              />
              <div
                className={`flex flex-1 lg:w-1/2 w-fit ${
                  message?.sender_id === currentUserId
                    ? "dark:bg-blue-400/40 bg-blue-500/90"
                    : "bg-gray-700"
                }  p-2 rounded-md mt-1`}
              >
                <div className="text-white text-start">{message?.msg_text}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {formatDateForUX(message?.created_date)}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Messages;
