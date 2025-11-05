"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


async function Logout() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <></>;
}

export default Logout;
