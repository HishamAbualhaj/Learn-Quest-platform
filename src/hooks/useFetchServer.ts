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
      signal: AbortSignal.timeout(15000),
    });

    if (res.status === 403 || res.status >= 500)
      throw new Error("BACKEND_UNAVAILABLE");
    else return await apiResponse<T>(res);
  } catch {
    throw new Error("BACKEND_UNAVAILABLE");
  }
}
export default useFetchServer;
