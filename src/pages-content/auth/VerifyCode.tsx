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
import { useParams, useRouter, useSearchParams } from "next/navigation";
function VerifyCode() {
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);

  const email = useSearchParams()?.get("email");
  const router = useRouter();
  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!email) return;
      return await useFetch(
        `${API_BASE_URL}/verifyCode`,
        {
          code: code,
          email: email || null,
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
    setCode(value);
  };

  useEffect(() => {
    if (data?.status) {
      router.push(`/confirmpass?email=${email}&&code=${code}`);
    }
  }, [data]);
  return (
    <AuthShell
      title="Check your inbox."
      description="Enter the code sent to your email. Check your spam folder if you do not see it."
      step="03 / ONE SMALL CHECK"
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
          <label htmlFor="code">Code</label>
          <Input
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            id="code"
            type="text"
            autoComplete="one-time-code"
            required
          />
        </div>
        <Button
          bgClr="bg-mainClr"
          bgDarkClr="dark:bg-mainClr"
          hoverBgClr="hover:bg-mainClr/90"
          hoverDarkBgClr="dark:hover:bg-mainClr/90"
          type="submit"
          text="Verify code"
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

export default VerifyCode;
