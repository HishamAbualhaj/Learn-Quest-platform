import { backendFetch } from "@/lib/backendStatus";
import { apiResponse } from "@/lib/apiResponse";
export type FetchResponse<T> = {
  status: boolean;
  msg: T | string;
  redirect: boolean;
  nextPage?: number;
};

async function useFetch<T = any>(
  url: string,
  data: Record<string, any> | null,
  method: string,
): Promise<FetchResponse<T>> {
  try {
    const res = await backendFetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
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

export default useFetch;
