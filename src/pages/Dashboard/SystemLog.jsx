import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
function SystemLog() {

  const [logs,setLogs] = useState([])
  useEffect(() => {
    (async () => {
      const res = await useFetch(
        "http://localhost:3002/getSystemLog",
        null,
        "GET"
      );
      setLogs(res.msg)
      console.log(res.msg)
    })();
  }, []);
  return (
    <div className="font-terminal">
      <div className="dark:text-white text-lightText text-4xl font-semibold">
        System Log
      </div>
      <div className="dark:bg-black/70 bg-lightLayout w-full max-h-[750px] overflow-auto rounded-md mt-5">
        <div className="dark:text-green-500 text-green-700">
          {logs.map((log) => (
            <Log
              id={log.log_id}
              logState={log.message}
              email={log.email}
              time={log.time}
              userId={log.student_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function Log({ id, logState, userId, email, time }) {
  const [active, setActive] = useState(false);
  return (
    <div
      key={id}
      id={id}
      onClick={(e) => {
        // console.log(e.currentTarget.getAttribute("id"));
        setActive(!active);
      }}
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
        </div>
      )}
    </div>
  );
}
export default SystemLog;
