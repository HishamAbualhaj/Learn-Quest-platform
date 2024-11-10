import React, { useEffect, useState } from "react";

function SystemLog() {
  const logs = [
    {
      logId: 812684844,
      logState: "Hisham just Logged In",
      userId: 45486864,
      email: "Hishamraid0@gmail.com",
      time: "10 sec ago",
    },
    {
      logId: 812684845,
      logState: "Osama just Logged Out",
      userId: 45376328,
      email: "Osama2023@gmail.com",
      time: "2 mins ago",
    },
    {
      logId: 812684846,
      logState: "Hesham just Signed Up",
      userId: 45781234,
      email: "HeshamCrafters@gmail.com",
      time: "5 mins ago",
    },
    {
      logId: 812684847,
      logState: "Ali just Updated Profile",
      userId: 45867439,
      email: "AliEngineer@gmail.com",
      time: "8 mins ago",
    },
    {
      logId: 812684848,
      logState: "Sara just Logged In",
      userId: 45987412,
      email: "SaraDev@gmail.com",
      time: "10 mins ago",
    },
    {
      logId: 812684849,
      logState: "John just Changed Password",
      userId: 45689234,
      email: "JohnWeb@gmail.com",
      time: "15 mins ago",
    },
    {
      logId: 812684850,
      logState: "Mona just Logged Out",
      userId: 45376284,
      email: "Mona@outlook.com",
      time: "20 mins ago",
    },
    {
      logId: 812684851,
      logState: "Zain just Reset Password",
      userId: 45897423,
      email: "ZainReact@gmail.com",
      time: "25 mins ago",
    },
    {
      logId: 812684852,
      logState: "Lina just Signed Up",
      userId: 45719283,
      email: "LinaUIUX@gmail.com",
      time: "30 mins ago",
    },
    {
      logId: 812684853,
      logState: "Ahmed just Deleted Account",
      userId: 45467321,
      email: "AhmedCoder@gmail.com",
      time: "35 mins ago",
    },
  ];

  const [itemMenu, setItemMenu] = useState({});

  const triggerDropdown = (logId) => {
    setItemMenu((prev) => ({
      ...prev,
      [logId]: !prev[logId],
    }));
  };

  return (
    <div className="font-terminal">
      <div className="dark:text-white text-lightText text-4xl font-semibold">Systenm Log</div>
      <div className="dark:bg-black/70 bg-lightLayout w-full max-h-[750px] overflow-auto rounded-md mt-5">
        <div className="dark:text-green-500 text-green-700">
          {logs.map((log) => (
            <div
              key={log.logId}
              id={log.logId}
              onClick={(e) => {
                // console.log(e.currentTarget.getAttribute("id"));
                triggerDropdown(log.logId);   
              }}
              className="border-b  border-green-300/40 md:p-6 p-4 hover:bg-gray-500/20 cursor-pointer"
            >
              <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between">
                <div>User: {log.logState}</div>
                <div className="">{log.time}</div>
              </div>

              {itemMenu[log.logId] && (
                <div className="ml-5 mt-5 dropMenu">
                  <div>Log-id: {log.logId}</div>
                  <div className="mt-2">user-id: {log.userId}</div>
                  <div className="mt-2">Email: {log.email}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SystemLog;
