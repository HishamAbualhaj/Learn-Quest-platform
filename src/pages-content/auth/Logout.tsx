"use client";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import AuthShell from "./AuthShell";

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

  return (
    <AuthShell
      title="Until your next chapter."
      description="Signing you out. Your learning journey will be here when you return."
      step="SEE YOU AGAIN SOON"
    >
      <div
        role="status"
        className="rounded-md border border-borderLight bg-lightLayout p-6 text-sm text-mainClr dark:border-borderDark dark:bg-lightDark dark:text-mainClrDark"
      >
        Signing out securely…
      </div>
    </AuthShell>
  );
}

export default Logout;
