import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/config";
import Button from "./Button";
import useFetch from "../hooks/useFetch";
function ConfirmPass() {
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [searchPara, _] = useSearchParams();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!searchPara.get("email") && !searchPara.get("code")) return;
      return await useFetch(
        `${API_BASE_URL}/resetPass`,
        {
          code: searchPara.get("code") || null,
          email: searchPara.get("email") || null,
          password: password,
        },
        "POST"
      );
    },
    onError: (e) => {
      console.log("Error", e);
    },
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setAlert(null);
  };

  const handleConfirmPass = (e) => {
    const { value } = e.target;
    setConfirmPass(value);
  };

  useEffect(() => {
    if (confirmPass !== password) {
      setAlert({ status: false, msg: "confirm password correctly" });
    } else {
      setAlert(null);
    }
  }, [confirmPass]);

  useEffect(() => {
    let timer = null;
    setAlert(data);
    if (data?.status) {
      timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  return (
    <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5 ">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-48 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        {alert &&
          (alert?.status ? (
            <Alert msg={alert.msg} type="success" />
          ) : (
            <Alert msg={alert.msg} />
          ))}
        <div className="lg:text-4xl text-2xl">Confirm password</div>
        <div className="dark:text-textDark text-lightText mt-2">
          Reset password
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <div className="flex flex-col mt-4">
            <label htmlFor="">Password</label>
            <input
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="password"
            />
          </div>
          {password && (
            <div className="flex flex-col mt-4">
              <label htmlFor="">Confirm Password</label>
              <input
                onChange={handleConfirmPass}
                className="mt-2 border rounded-md w-full"
                type="password"
              />
            </div>
          )}

          <Button
            type="submit"
            text="Reset password"
            loadingText="Loading"
            isloading={isPending}
            padding="py-4 w-full font-semibold"
          />
        </form>
      </div>
    </div>
  );
}

export default ConfirmPass;
