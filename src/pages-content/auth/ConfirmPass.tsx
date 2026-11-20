"use client";
import { Input } from "@/components/ui/form-input";
import Link from "next/link";
import AuthShell from "./AuthShell";
import { ChangeEvent, useEffect, useState } from "react";
import Alert from "@/components/feedback/Alert";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "../../config/config";
import Button from "@/components/shared/Button";
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
    if (data?.status) {
      timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [data, router]);

  return (
    <AuthShell
      title="Make it yours again."
      description="Choose a new password to get back to your learning journey."
      step="04 / READY FOR YOUR NEXT CHAPTER"
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
          if (password !== confirmPass) return;
          mutate();
        }}
      >
        <div className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            type="password"
          />
        </div>
        {password && (
          <div className="flex flex-col mt-4">
            <label htmlFor="confirm-password">Confirm Password</label>
            <Input
              id="confirm-password"
              autoComplete="new-password"
              required
              onChange={handleConfirmPass}
              className="mt-2 border rounded-md w-full"
              type="password"
            />
          </div>
        )}

        <Button
          bgClr="bg-mainClr"
          bgDarkClr="dark:bg-mainClr"
          hoverBgClr="hover:bg-mainClr/90"
          hoverDarkBgClr="dark:hover:bg-mainClr/90"
          type="submit"
          text="Reset password"
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

export default ConfirmPass;
