"use client";
import { Input } from "@/components/ui/form-input";
import AuthShell from "./AuthShell";
import Button from "@/components/shared/Button";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Alert from "@/components/feedback/Alert";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "@/config/config";

import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { Button as ActionButton } from "@/components/ui/button";

const demoAccounts = [
  {
    role: "Admin",
    email: "admin@learnquest.example",
    password: "DemoAdmin123!",
    icon: ShieldCheck,
  },
  {
    role: "Student",
    email: "student@learnquest.example",
    password: "DemoStudent123!",
    icon: GraduationCap,
  },
] as const;

function Login() {
  const [demoMessage, setDemoMessage] = useState("");
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);

  const router = useRouter();
  useEffect(() => {
    alert?.redirect && router.push("/");
  }, [alert]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDemoMessage("");
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }

  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      return await useFetch<string>(`${API_BASE_URL}/login`, userData, "POST");
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

  return (
    <AuthShell
      title="Welcome back."
      description="Your next chapter is right where you left it. Log in to keep growing."
      step="01 / KEEP YOUR CURIOSITY GOING"
    >
      {alert &&
        (alert?.status ? (
          <Alert msg={alert?.msg} type="success" />
        ) : (
          <Alert msg={alert?.msg} type={undefined} />
        ))}

      <section
        aria-labelledby="demo-accounts-heading"
        className="mb-6 rounded-md border border-mainClr/20 bg-mainClr/5 p-5 dark:border-mainClrDark/25 dark:bg-mainClrDark/5"
      >
        <h2
          id="demo-accounts-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Explore with a demo account
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          No signup needed. Choose an account to fill the form, then log in to
          explore.
        </p>
        <div className="mt-4 divide-y divide-borderLight dark:divide-borderDark">
          {demoAccounts.map((account) => (
            <div key={account.role} className="py-4 first:pt-0 last:pb-0">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <account.icon
                  aria-hidden="true"
                  className="size-4 text-mainClr dark:text-mainClrDark"
                />
                {account.role} demo
              </div>
              <dl className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm leading-6">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="select-all break-all">{account.email}</dd>
                <dt className="text-muted-foreground">Password</dt>
                <dd className="select-all break-all">{account.password}</dd>
              </dl>
              <ActionButton
                type="button"
                disabled={isPending}
                className="mt-4 min-h-11 w-full"
                onClick={() => {
                  setUserData({
                    email: account.email,
                    password: account.password,
                  });
                  setAlert(null);
                  setDemoMessage(
                    `${account.role} credentials filled. Log in to continue.`,
                  );
                }}
              >
                Use {account.role.toLowerCase()} account
              </ActionButton>
            </div>
          ))}
        </div>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm leading-6 text-mainClr dark:text-mainClrDark ${demoMessage ? "mt-4" : "sr-only"}`}
        >
          {demoMessage}
        </p>
      </section>

      <a
        href={`${API_BASE_URL}/auth/google`}
        className="mt-6 flex min-h-12 items-center justify-center gap-3 rounded-md border border-borderLight text-sm font-medium transition hover:bg-lightLayout dark:border-borderDark dark:hover:bg-hoverDark"
      >
        <img width="20" height="20" src="/google.svg" alt="" />
        Log in with Google
      </a>
      <div className="dark:text-textDark text-lightText mt-8 flex items-center gap-3">
        <div className="dark:bg-borderDark bg-borderLight h-px w-1/2"></div>
        OR
        <div className="dark:bg-borderDark bg-borderLight h-px w-1/2"></div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <div className="flex flex-col mt-4">
          <label htmlFor="email">Email</label>
          <Input
            required
            onChange={handleChange}
            id="email"
            value={userData.email}
            autoComplete="email"
            className="mt-2 border rounded-md w-full"
            type="email"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <Input
            required
            onChange={handleChange}
            id="password"
            value={userData.password}
            autoComplete="current-password"
            className="mt-2 border rounded-md w-full"
            type="password"
          />
          <div className="text-mainClr dark:text-mainClrDark mt-2 underline ">
            <a href="forgotpassword">Forgot password?</a>
          </div>
        </div>
        <Button
          bgClr="bg-mainClr"
          bgDarkClr="dark:bg-mainClr"
          hoverBgClr="hover:bg-mainClr/90"
          hoverDarkBgClr="dark:hover:bg-mainClr/90"
          type="submit"
          text="Login"
          loadingText="Loading"
          isloading={isPending}
          padding="py-4 w-full font-semibold"
          textDarkClr="dark:text-white"
          hoverTextClr={undefined}
          hoverDarkTextClr={undefined}
        />
      </form>
      <div className="text-darkText mt-3 flex gap-2 items-center">
        New to LearnQuest?
        <div className="text-mainClr dark:text-mainClrDark underline ">
          <a href="signup">Sign up</a>
        </div>
      </div>
    </AuthShell>
  );
}

export default Login;
