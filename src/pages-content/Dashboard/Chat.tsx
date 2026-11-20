"use client";
import { useEffect, useRef, useState } from "react";
import { Search, Send, MessageSquare, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminEmpty,
  AdminFeedback,
  adminPanel,
} from "@/components/admin/AdminPage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL, { API_WEB_SOCKET } from "@/config/config";
import Avatar from "@/components/Avatar";
import Messages from "./Messages";
import type { User } from "@/types";
export default function Chat({ userData }: { userData: User }) {
  const [selected, setSelected] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [reconnect, setReconnect] = useState(0);
  const [live, setLive] = useState({
    msg_id: "",
    sender_id: "",
    receiver_id: "",
    msg: "",
    date: "",
  });
  const socket = useRef<WebSocket | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const { dataFetched, isFetching, hasNextPage, loadMore, refetch, error } =
    useInfiniteScroll<User>({
      fetchFn: async (page) => {
        const res = await useFetch(
          `${API_BASE_URL}/getUsers`,
          { page },
          "POST",
        );
        if (!res.status) throw new Error(String(res.msg));
        return res;
      },
      queryKey: ["users_chat"],
      scrollContainer: container,
      observedEle: null,
      data_id: "student_id",
      retry: 1,
    });
  useEffect(() => {
    if (!selected) return;
    let active = true;
    setConnected(false);
    setConnectionError("");
    setLive({ msg_id: "", sender_id: "", receiver_id: "", msg: "", date: "" });
    let ws: WebSocket;
    try {
      ws = new WebSocket(API_WEB_SOCKET ?? "");
      socket.current = ws;
    } catch {
      setConnectionError(
        "Messaging is unavailable. Please reconnect to try again.",
      );
      return;
    }
    ws.onopen = () => {
      if (!active) return;
      ws.send(
        JSON.stringify({
          type: "init",
          sender_id: String(userData.student_id),
        }),
      );
      setConnected(true);
    };
    ws.onmessage = (event) => {
      if (!active) return;
      try {
        const value = JSON.parse(event.data);
        const participants = [String(value.from), String(value.to)];
        if (
          value.msg_id &&
          participants.includes(String(selected.student_id)) &&
          participants.includes(String(userData.student_id))
        )
          setLive({
            msg_id: String(value.msg_id),
            sender_id: String(value.from),
            receiver_id: String(value.to),
            msg: value.msg,
            date: value.date,
          });
      } catch {
        setConnectionError(
          "A message could not be read. Reconnect to refresh the conversation.",
        );
      }
    };
    ws.onerror = () => {
      if (active) {
        setConnected(false);
        setConnectionError(
          "Messaging is unavailable. Please reconnect to try again.",
        );
      }
    };
    ws.onclose = () => {
      if (active) {
        setConnected(false);
        setConnectionError("Messaging disconnected. Reconnect to continue.");
      }
    };
    return () => {
      active = false;
      ws.close();
      if (socket.current === ws) socket.current = null;
    };
  }, [selected?.student_id, userData.student_id, reconnect]);
  function send() {
    if (
      !selected ||
      !draft.trim() ||
      socket.current?.readyState !== WebSocket.OPEN
    )
      return;
    try {
      socket.current.send(
        JSON.stringify({
          type: "chat",
          sender_id: String(userData.student_id),
          receiver_id: String(selected.student_id),
          msg: draft.trim(),
        }),
      );
      setDraft("");
    } catch {
      setConnected(false);
      setConnectionError(
        "Your message could not be sent. Reconnect and try again.",
      );
    }
  }
  const users = dataFetched.filter(
    (user) =>
      String(user.student_id) !== String(userData.student_id) &&
      `${user.first_name} ${user.last_name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <AdminHeading
        title="Messages"
        description="Keep conversations with your learners clear, personal, and easy to find."
      />
      <div className="grid min-w-0 items-start gap-5 md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <section
          ref={container}
          className={`${adminPanel} min-w-0 ${selected ? "hidden md:block" : ""}`}
          aria-label="Learner conversations"
        >
          <div className="border-b border-borderLight p-5 dark:border-borderDark">
            <h2 className="mb-4 text-lg font-semibold">Your community</h2>
            <label htmlFor="chat-search" className="sr-only">
              Search loaded learners
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute top-3.5 left-3 size-4 text-muted-foreground"
              />
              <Input
                id="chat-search"
                type="search"
                className="min-h-11 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search loaded learners"
              />
            </div>
          </div>
          <div className="max-h-[560px] overflow-y-auto p-2">
            {users.map((user) => (
              <button
                key={user.student_id}
                type="button"
                aria-pressed={selected?.student_id === user.student_id}
                onClick={() => {
                  setSelected(user);
                  setDraft("");
                }}
                className={`flex min-h-20 w-full cursor-pointer items-center gap-3 rounded-md p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-ring ${selected?.student_id === user.student_id ? "bg-mainClr/10 dark:bg-mainClrDark/10" : "hover:bg-lightLayout dark:hover:bg-hoverDark"}`}
              >
                <Avatar img={user.image_url} className="size-11 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold break-words">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </span>
              </button>
            ))}
            {!users.length && !isFetching && !error && (
              <AdminEmpty
                title="No learners found"
                description="Try another search or load more learners."
              />
            )}
            <AdminFeedback
              loading={isFetching}
              error={error}
              retry={refetch}
              label="Loading learners"
            />
            {hasNextPage && (
              <Button
                variant="outline"
                className="my-3 min-h-11 w-full"
                disabled={isFetching}
                onClick={loadMore}
              >
                Load more learners
              </Button>
            )}
          </div>
        </section>
        <section
          className={`${adminPanel} flex min-w-0 flex-col ${!selected ? "hidden md:flex" : ""}`}
          aria-label="Conversation"
        >
          {selected ? (
            <>
              <div className="flex items-center gap-3 border-b border-borderLight p-5 dark:border-borderDark">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 md:hidden"
                  aria-label="Back to learners"
                  onClick={() => setSelected(null)}
                >
                  <ArrowLeft aria-hidden="true" />
                </Button>
                <Avatar img={selected.image_url} className="size-11 shrink-0" />
                <div className="min-w-0">
                  <h2 className="font-semibold break-words">
                    {selected.first_name} {selected.last_name}
                  </h2>
                  <p
                    role="status"
                    className="mt-1 text-sm text-muted-foreground"
                  >
                    {connected
                      ? "Messaging connected"
                      : "Messaging disconnected"}
                  </p>
                </div>
              </div>
              <div className="flex h-[450px] min-h-0 flex-col [&>div]:min-h-0 [&>div]:flex-1">
                <Messages
                  key={selected.student_id}
                  msg_id={live.msg_id}
                  sender_id={live.sender_id || String(userData.student_id)}
                  receiver_id={live.receiver_id || String(selected.student_id)}
                  msg={live.msg}
                  date={live.date}
                  currentUserId={String(userData.student_id)}
                  sender_name={userData.first_name}
                  sender_image={userData.image_url}
                  receiver_name={selected.first_name}
                  receiver_image={selected.image_url}
                />
              </div>
              {connectionError && (
                <div
                  role="alert"
                  className="flex flex-wrap items-center gap-3 border-t border-input p-4 text-sm"
                >
                  <span className="min-w-0 flex-1 text-muted-foreground">
                    {connectionError}
                  </span>
                  <Button
                    variant="outline"
                    className="min-h-11"
                    onClick={() => setReconnect((value) => value + 1)}
                  >
                    Reconnect
                  </Button>
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-end gap-3 border-t border-borderLight p-4 dark:border-borderDark"
              >
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="admin-message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Input
                    id="admin-message"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="min-h-11"
                    placeholder="Write a thoughtful reply..."
                  />
                </div>
                <Button
                  type="submit"
                  className="min-h-11"
                  disabled={!connected || !draft.trim()}
                  aria-label="Send message"
                >
                  <Send aria-hidden="true" />
                  <span className="hidden xl:inline">Send</span>
                </Button>
              </form>
            </>
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center">
              <MessageSquare
                aria-hidden="true"
                className="mb-5 size-10 text-mainClr dark:text-mainClrDark"
              />
              <h2 className="text-xl font-semibold">Start a conversation</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                Choose a learner to see your conversation and send a reply.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
