"use client";
import { Input } from "@/components/ui/form-input";
import Link from "next/link";
import AuthShell from "./AuthShell";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import Button from "@/components/shared/Button";
import Alert from "@/components/feedback/Alert";
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
        "POST",
      );
    },
    onSuccess: (data) => {
      setAlert(
        data
          ? {
              ...data,
              msg: Array.isArray(data.msg) ? data.msg.join(", ") : data.msg,
            }
          : null,
      );
    },
    onError: (error) => {
      console.log("Error", error);
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
  }, [data]);

  return (
    <AuthShell
      title="A fresh start."
      description="Enter your email and we will send you a code to reset your password."
      step="02 / FIND YOUR WAY BACK"
    >
      {alert &&
        (alert?.status ? (
          <Alert msg={alert.msg} type="success" />
        ) : (
          <Alert msg={alert.msg} />
        ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <div className="flex flex-col mt-4">
          <label htmlFor="email">Email</label>
          <Input
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            id="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <Button
          bgClr="bg-mainClr"
          bgDarkClr="dark:bg-mainClr"
          hoverBgClr="hover:bg-mainClr/90"
          hoverDarkBgClr="dark:hover:bg-mainClr/90"
          type="submit"
          text="Send code to reset"
          loadingText="Loading"
          isloading={isPending}
          padding="py-4 w-full font-semibold"
          textDarkClr="dark:text-white"
          hoverTextClr={undefined}
          hoverDarkTextClr={undefined}
        />
      </form>
      <Link
        href="/login"
        className="mt-6 inline-flex min-h-11 items-center text-sm font-medium"
      >
        Back to log in
      </Link>
    </AuthShell>
  );
}

export default ForgotPass;
