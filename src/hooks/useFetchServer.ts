import { cookies } from "next/headers";
type response = {
  status: boolean;
  msg: any;
  redirect: boolean;
  nextPage?: number;
};
async function useFetchServer(
  url: string,
  data: Record<string, any> | null,
  method: string
) {
  let response: response;
  let res;
  try {
    res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body:
        ["POST", "PATCH", "GET", "PUT"].includes(method) && data
          ? JSON.stringify(data)
          : undefined,
      credentials: "include",
    });

    const result = await res.json();
    if (res.status === 404) {
      response = {
        status: false,
        msg: "Page is not found",
        redirect: false,
      };
    } else {
      // Handle success and fail status from server side
      result.status
        ? (response = {
            status: result.status,
            msg: result.data,
            redirect: true,
            nextPage: result?.nextPage,
          })
        : (response = {
            status: result.status,
            msg: result.data,
            redirect: false,
            nextPage: result?.nextPage,
          });
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    response = {
      status: false,
      msg: "Error connecting to server",
      redirect: false,
    };
  }

  return response;
}

export default useFetchServer;
