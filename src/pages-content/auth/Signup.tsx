"use client";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/form-input";
import AuthShell from "./AuthShell";
import { useEffect, useState } from "react";
import Alert from "@/components/feedback/Alert";
import Button from "@/components/shared/Button";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
function Signup() {
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
    first_name: "",
    last_name: "",
    status_user: false,
    email: "",
    password: "",
    gender: "Male",
    birthdate: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }

  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      return await useFetch(`${API_BASE_URL}/signup`, userData, "POST");
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
      title="Make today day one."
      description="Create your free account and make room for something new."
      step="01 / YOUR JOURNEY STARTS HERE"
    >
      {alert &&
        (alert?.status ? (
          <Alert msg={alert?.msg} type="success" />
        ) : (
          <Alert msg={alert?.msg} />
        ))}

      <a
        href={`${API_BASE_URL}/auth/google`}
        className="mt-6 flex min-h-12 items-center justify-center gap-3 rounded-md border border-borderLight text-sm font-medium transition hover:bg-lightLayout dark:border-borderDark dark:hover:bg-hoverDark"
      >
        <img width="20" height="20" src="/google.svg" alt="" />
        Sign up with Google
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="first_name">First name</label>
            <Input
              required
              id="first_name"
              autoComplete="given-name"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="text"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="last_name">Last name</label>
            <Input
              required
              id="last_name"
              autoComplete="family-name"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="email">Email</label>
          <Input
            required
            id="email"
            autoComplete="email"
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            type="email"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="gender">Gender</label>
          <FormSelect
            className="mt-2 border rounded-md w-full"
            onChange={handleChange}
            name=""
            id="gender"
          >
            <option className="text-black" value="Male">
              Male
            </option>
            <option className="text-black" value="Female">
              Female
            </option>
          </FormSelect>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <Input
            required
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            type="password"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="birthdate">Date of Birth</label>
          <Input
            required
            id="birthdate"
            autoComplete="bday"
            onChange={handleChange}
            className="mt-2 border rounded-md w-full"
            type="date"
          />
        </div>
        <Button
          bgClr="bg-mainClr"
          bgDarkClr="dark:bg-mainClr"
          hoverBgClr="hover:bg-mainClr/90"
          hoverDarkBgClr="dark:hover:bg-mainClr/90"
          type="submit"
          text="Sign up"
          loadingText="Loading"
          isloading={isPending}
          padding="py-4 w-full font-semibold"
          textDarkClr="dark:text-white"
          hoverTextClr={undefined}
          hoverDarkTextClr={undefined}
        />
      </form>

      <div className="text-darkText mt-3 flex gap-2 items-center">
        Already have an account?
        <div className="text-mainClr dark:text-mainClrDark underline ">
          <a href="login">Log in</a>
        </div>
      </div>
    </AuthShell>
  );
}

export default Signup;
