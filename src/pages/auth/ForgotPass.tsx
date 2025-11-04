"use client";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
function ForgotPass() {
  const [email, setEmail] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);

  const router = useRouter();

  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!email) return;
      return await useFetch(
        `${API_BASE_URL}/forgotPass`,
        {
          email: email,
        },
        "POST"
      );
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  useEffect(() => {
    if (data?.status) {
      router.push(`/verifycode?email=${email}`);
    }
    setAlert(
      data
        ? {
            ...data,
            msg: Array.isArray(data.msg) ? data.msg.join(", ") : data.msg,
          }
        : null
    );
  }, [data]);

  return (
    <>
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
          <div className="lg:text-4xl text-2xl">Forgot password</div>
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
              <label htmlFor="">Email</label>
              <input
                onChange={handleChange}
                className="mt-2 border rounded-md w-full"
                type="text"
              />
            </div>
            <Button
              type="submit"
              text="Send code to reset"
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
    </>
  );
}

export default ForgotPass;
