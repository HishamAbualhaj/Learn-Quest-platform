import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import { UserData } from "../../context/UserDataContext";
import Alert from "../../components/Alert";
export default function Maintenance() {
  const data_user = useContext(UserData);
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(true);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (data_user) {
      const userDataArray = data_user?.userData;
      const { student_id, email, first_name } = userDataArray?.[0] ?? {
        student_id: null,
        email: null,
        first_name: null,
      };
      setUserData({ student_id, email, first_name });
    }
  }, [data_user]);

  const { data, refetch } = useQuery({
    queryKey: ["maintenance"],
    queryFn: async () => {
      return await useFetch(`${API_BASE_URL}/getMaintenace`, null, "GET");
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!userData.student_id) return;
      return await useFetch(
        `${API_BASE_URL}/setMaintenance`,
        { ...userData, status },
        "POST"
      );
    },
    onSuccess: () => {
      refetch();
    },
  });
  useEffect(() => {
    if (data && userData?.student_id) {
      const status = data?.msg?.[0]?.status ?? true;
      setAction(false);
      setMsg(
        `${status ? "System is running now" : "System is down for maintenance"}`
      );
      setStatus(status);
    }
  }, [data,userData]);

  const [count, setCount] = useState(5);
  const [action, setAction] = useState(false);
  useEffect(() => {
    let countTimer = null;
    if (action && userData?.student_id) {
      setCount(5);
      countTimer = setInterval(() => {
        setCount((prev) => {
          if (prev === 0) {
            clearInterval(countTimer);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countTimer);
  }, [action, userData]);

  return (
    <div>
      {msg === null ? (
        <></>
      ) : (
        <Alert
          type={`${action ? "fail" : "success"}`}
          msg={`${action ? `${msg} ${count} sec` : msg}`}
        />
      )}
      <div className="items-center sm:flex block justify-between">
        <div className="title">
          <div className="dark:text-white text-lightText font-semibold text-4xl">
            Maintenance
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2 ">
            Shut down the server for maintenance purposes
          </div>
        </div>
        {status === null ? (
          <div
            className={`py-2 px-6 rounded-lg text-center text-4xl sm:mt-0 mt-5 sm:w-fit w-fulldark:text-red-300  text-red-400 bg-red-400/20"`}
          >
            ...
          </div>
        ) : (
          <div
            className={`py-2 px-6 rounded-lg text-center text-2xl sm:mt-0 mt-5 sm:w-fit w-full ${
              status
                ? "dark:text-green-300 text-green-400 bg-green-400/20"
                : "dark:text-red-300  text-red-400 bg-red-400/20"
            }`}
          >
            {status ? "Active" : "Inactive"}
          </div>
        )}
      </div>
      <div className="flex  justify-center items-center min-h-[500px] dark:bg-black/20 bg-black/10 mt-5">
        {status === null ? (
          <></>
        ) : (
          !isPending && (
            <FontAwesomeIcon
              onClick={() => {
                setAction(true);
                setMsg(
                  `${
                    status
                      ? "System will shut down after"
                      : "System will run after"
                  }`
                );
                mutate();
              }}
              className={`cursor-pointer  text-[200px] ${
                status
                  ? "dark:text-red-400/40 text-red-300 dark:hover:text-red-500 hover:text-red-500"
                  : "dark:text-green-400/40 text-green-300 dark:hover:text-green-500 hover:text-green-500"
              }  transition`}
              icon={faPowerOff}
            />
          )
        )}
      </div>
    </div>
  );
}

/*


*/
