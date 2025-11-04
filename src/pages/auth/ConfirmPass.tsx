"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "../../config/config";
import Button from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import { useRouter, useSearchParams } from "next/navigation";
function ConfirmPass() {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);

  const router = useRouter();

  const email = useSearchParams()?.get("email");
  const code = useSearchParams()?.get("code");
  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!email && !code) return;
      return await useFetch(
        `${API_BASE_URL}/resetPass`,
        {
          code: code || null,
          email: email || null,
          password: password,
        },
        "POST"
      );
    },
    onError: (e) => {
      console.log("Error", e);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setAlert(null);
  };

  const handleConfirmPass = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPass(value);
  };

  useEffect(() => {
    if (confirmPass !== password) {
      setAlert({
        status: false,
        msg: "confirm password correctly",
        redirect: false,
      });
    } else {
      setAlert(null);
    }
  }, [confirmPass]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setAlert(
      data
        ? {
            ...data,
            msg: Array.isArray(data.msg) ? data.msg.join(", ") : data.msg,
          }
        : null
    );
    if (data?.status) {
      timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  return (
    <div className="dark:bg-dark bg-lightLayout h-screen md:px-0 px-5 ">
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
            textDarkClr={undefined}
            hoverTextClr={undefined}
            hoverDarkTextClr={undefined}
          />
        </form>
      </div>
    </div>
  );
}

export default ConfirmPass;
