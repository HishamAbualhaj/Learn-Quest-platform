"use client";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function Logout() {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    useFetch(`${API_BASE_URL}/logout`, null, "GET").finally(() => {
      router.push("/");
    });
  }, [router]);

  return null;
}

export default Logout;
