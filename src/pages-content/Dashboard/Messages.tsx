import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch, { FetchResponse } from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import Avatar from "../../components/Avatar";
import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "@/types";
interface MessageProps {
  msg_id: string;
  sender_id: string;
  receiver_id: string;
  msg: string;
  date: string;
  currentUserId: string;
  sender_name: string;
  sender_image: string;
  receiver_name: string;
  receiver_image: string;
}
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
}: MessageProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [lastNode, setLastNode] = useState<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const msgContainer = useRef<HTMLDivElement | null>(null);
  const prevScrollHeight = useRef(0);
  const scrollReasonRef = useRef<string | null>(null);
  const getChatkey = (sender: number, receiver: number) => [
    "messages",
    [sender, receiver].sort().join("_"),
  ];
  const { dataFetched, isFetching, refetch, isFetchingNextPage } =
    useInfiniteScroll<MessageType>({
      fetchFn: async (pagePara) => {
        if (!sender_id && !receiver_id)
          return {
            status: false,
            redirect: false,
            msg: "",
            nextPage: undefined,
          };
        return await useFetch(
          `${API_BASE_URL}/getMsg`,
          { page: pagePara, ...{ sender_id, receiver_id } },
          "POST"
        );
      },
      queryKey: getChatkey(Number(sender_id), Number(receiver_id)),
      scrollContainer: msgContainer,
      observedEle: lastNode,
      data_id: "msg_id",
    });

  useEffect(() => {
    if (!msg) return;
    // append the UI for this msg
    const container = msgContainer.current;
    const buffer = 5;
    if (currentUserId === sender_id) {
      scrollReasonRef.current = "sending";
    } else {
      scrollReasonRef.current = "receiving";

      const isScrollBottom =
        container!.scrollHeight - container!.scrollTop <=
        container!.clientHeight + buffer;

      if (!isScrollBottom) {
        scrollReasonRef.current = "scrolled_top";
      }
    }

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
    queryClient.setQueryData(
      getChatkey(Number(sender_id), Number(receiver_id)),
      (oldMsg: {
        pages: FetchResponse<MessageType[]>[];
        pageParams: number[];
      }) => {
        console.log(oldMsg);
        if (!oldMsg) return;

        const oldMsgPage = oldMsg?.pages?.at(0);
        const msgApiData = oldMsgPage?.msg ?? null;
        if (!msgApiData || typeof msgApiData === "string") {
          return;
        }
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
      }
    );
  }, [msg_id]);

  useEffect(() => {
    prevScrollHeight.current = msgContainer.current!.scrollHeight;
    const arr = [...dataFetched];
    scrollReasonRef.current = "loading";
    setMessages(arr.reverse());
  }, [dataFetched]);

  useLayoutEffect(() => {
    const container = msgContainer.current;
    if (!container) return;
    requestAnimationFrame(() => {
      if (messages.length <= 10 || scrollReasonRef.current === "sending") {
        container.scrollTop = container.scrollHeight;
      }

      if (scrollReasonRef.current === "loading") {
        container.scrollTop = container.scrollHeight - prevScrollHeight.current;
      }

      if (scrollReasonRef.current === "receiving") {
        container.scrollTop = container.scrollHeight;
      }
    });
  }, [messages]);

  const observeEle = (node: HTMLDivElement) => {
    setLastNode(node);
  };

  function formatDateForUX(dateStr: string) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
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
      {isFetchingNextPage && (
        <>
          <div className="flex flex-col">
            <div className="flex w-1/2 h-10 bg-gray-700 animate-syncPuls p-2 rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex w-1/2 h-10 bg-gray-700 p-2 animate-syncPuls rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex w-1/2 h-10 bg-gray-700 animate-syncPuls p-2 rounded-md mt-1"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex w-1/2 h-10 bg-gray-700 p-2 animate-syncPuls rounded-md mt-1"></div>
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
            ref={messages[1] === message ? observeEle : null}
            className={`flex flex-col ${
              String(message?.sender_id) === currentUserId
                ? "items-start"
                : "items-end"
            } `}
          >
            <div className="dark:text-white text-lightText text-sm">
              {String(message?.sender_id) === currentUserId
                ? sender_name
                : receiver_name}
            </div>
            <div
              className={`flex mt-2 items-center gap-2 ${
                String(message?.sender_id) === currentUserId
                  ? ""
                  : "flex-row-reverse"
              }`}
            >
              <Avatar
                img={
                  String(message?.sender_id) === currentUserId
                    ? sender_image
                    : receiver_image
                }
                className={`h-10 w-10`}
              />
              <div
                className={`flex flex-1 lg:w-1/2 w-fit ${
                  String(message?.sender_id) === currentUserId
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
