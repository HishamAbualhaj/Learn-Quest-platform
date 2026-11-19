import { apiResponse } from "@/lib/apiResponse";
import { cookies } from "next/headers";

export type FetchResponse<T> = {
  status: boolean;
  msg: T | string;
  redirect: boolean;
  nextPage?: number;
};

async function useFetchServer<T = any>(
  url: string,
  data: Record<string, any> | null,
  method: string,
): Promise<FetchResponse<T>> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(sessionId ? { Cookie: `session_id=${sessionId}` } : {}),
      },
      body:
        ["POST", "PATCH", "PUT", "DELETE"].includes(method) && data
          ? JSON.stringify(data)
          : undefined,
      credentials: "include",
    });

    return await apiResponse<T>(res);
  } catch (error) {
    console.error("Error connecting to server:", error);
    return {
      status: false,
      msg: "Error connecting to server",
      redirect: false,
    };
  }
}

export default useFetchServer;
