export type FetchResponse<T> = {
  status: boolean;
  msg: T | string;
  redirect: boolean;
  nextPage?: number;
};

async function useFetch<T = any>(
  url: string,
  data: Record<string, any> | null,
  method: string
): Promise<FetchResponse<T>> {
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        ["POST", "PATCH", "GET", "PUT"].includes(method) && data
          ? JSON.stringify(data)
          : undefined,
      credentials: "include",
    });

    const result = await res.json();
    if (res.status === 404) {
      return {
        status: false,
        msg: "Page is not found",
        redirect: false,
      };
    } else {
      // Handle success and fail status from server side
      return result.status
        ? {
            status: result.status,
            msg: result.data,
            redirect: true,
            nextPage: result?.nextPage,
          }
        : {
            status: result.status,
            msg: result.data,
            redirect: false,
            nextPage: result?.nextPage,
          };
    }
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
