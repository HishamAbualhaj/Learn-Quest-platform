import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faClock,
  faPersonChalkboard,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import { useQuery } from "@tanstack/react-query";
function Analytics() {
  const { data } = useQuery({
    queryFn: async () => {
      return await useFetch(`${API_BASE_URL}/getAnalystic`, null, "GET");
    },
    queryKey: ["analytics"],
  });

  return (
    <div className="h-[800px] overflow-auto">
      <div className="flex items-center justify-between sm:flex-row flex-col">
        <div>
          <div className="dark:text-white text-lightText font-semibold text-4xl ">
            Analytics Panel
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2">
            Track users , courses, and much more
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="rounded-md border dark:border-borderDark  p-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="dark:text-white text-lightText text-xl  p-2 rounded-full"
                icon={faUser}
              />
            }
            text={"Total users"}
            number={data?.msg?.users ?? "..."}
          />
          <div className="flex gap-3 lg:flex-row flex-col mt-3 ">
            <Panel
              icon={<Ping color={"green"} />}
              text={"Active users"}
              number={data?.msg?.active_users ?? "..."}
            />
            <Panel
              icon={<Ping color={"red"} />}
              text={"inactive users"}
              number={data?.msg?.inactive_users ?? "..."}
            />
          </div>
        </div>

        <div className="rounded-md border dark:border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="dark:text-white text-lightText text-xl  p-2 rounded-full"
                icon={faPersonChalkboard}
              />
            }
            text={"total courses"}
            number={data?.msg?.courses ?? "..."}
          />
        </div>

        <div className="rounded-md border dark:border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="dark:text-white text-lightText text-xl  p-2 rounded-full"
                icon={faStar}
              />
            }
            text={"total reviews"}
            number={data?.msg?.reviews ?? "..."}
          />
        </div>
        <div className="rounded-md border dark:border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="dark:text-white text-lightText text-xl  p-2 rounded-full"
                icon={faBlog}
              />
            }
            text={"total blog posts"}
            number={15}
          />
        </div>
        <div className="rounded-md border dark:border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="dark:text-white text-lightText text-xl  p-2 rounded-full"
                icon={faClock}
              />
            }
            text={"System up time"}
            number={`${data?.msg?.time || "..."}`}
          />
        </div>
      </div>
    </div>
  );
}
function Ping({ color }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`}
      ></span>
    </span>
  );
}
function Panel({ icon, text, number }) {
  return (
    <div className="p-5 dark:bg-lightDark bg-white dark:shadow-lg box-shadow flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div className="dark:text-white text-lightText xl:text-2xl text-xl uppercase">
            {text}
          </div>
        </div>

        <div className="text-2xl font-semibold dark:text-white text-lightText">
          {number}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
