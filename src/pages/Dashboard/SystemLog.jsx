import React, { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import API_BASE_URL from "../../config/config";
import { forwardRef } from "react";
import useArrange from "../../hooks/useArrange";
function SystemLog() {
  const [logs, setLogs] = useState([]);
  const [lastNode, setLastNode] = useState(null);

  const logsContainer = useRef();

  const { dataFetched, isFetching, hasNextPage } = useInfiniteScroll({
    fetchFn: (pageParam) => {
      return useFetch(
        `${API_BASE_URL}/getSystemLog`,
        { page: pageParam },
        "POST"
      );
    },
    queryKey: ["systemlogs"],
    scrollContainer: logsContainer,
    observedEle: lastNode,
    data_id: "log_id",
  });
  useEffect(() => {
    setLogs(dataFetched);
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };
  return (
    <div className="font-terminal">
      <div className="dark:text-white text-lightText text-4xl font-semibold">
        System Log
      </div>
      <div
        ref={logsContainer}
        className="dark:bg-black/70 bg-lightLayout w-full max-h-[650px] overflow-auto rounded-md mt-5"
      >
        <div className="dark:text-green-500 text-green-700">
          {logs.map((log) => (
            <Log
              ref={logs.at(-1) === log ? observeEle : null}
              key={log.log_id}
              id={log.log_id}
              logState={log.message}
              email={log.email}
              time={log.time}
              userId={log.student_id}
              date={log.created_date}
            />
          ))}
        </div>
        {isFetching ? (
          <div className="dark:text-red-300 text-red-600 flex justify-center py-5 animate-syncPuls">
            Loading ...
          </div>
        ) : (
          !hasNextPage && (
            <div className="dark:text-red-300 text-red-600 flex justify-center py-5">
              No more logs
            </div>
          )
        )}
      </div>
    </div>
  );
}
const Log = forwardRef(function Log(
  { id, logState, userId, email, time, date },
  ref
) {
  const [active, setActive] = useState(false);
  return (
    <div
      id={id}
      onClick={() => {
        setActive(!active);
      }}
      ref={ref}
      className="border-b  border-green-300/40 md:p-6 p-4 hover:bg-gray-500/20 cursor-pointer"
    >
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between">
        <div>{logState}</div>
        <div className="">{time}</div>
      </div>

      {active && (
        <div className="ml-5 mt-5 dropMenu">
          <div>Log-id: {id}</div>
          <div className="mt-2">user-id: {userId}</div>
          <div className="mt-2">Email: {email}</div>
          <div className="mt-2">date: {date.replace(/[TZ]/g, " ")}</div>
        </div>
      )}
    </div>
  );
});

export default SystemLog;
