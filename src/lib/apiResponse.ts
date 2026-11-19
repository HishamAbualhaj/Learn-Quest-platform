export async function apiResponse<T>(response: Response): Promise<{
  status: boolean;
  msg: T | string;
  redirect: boolean;
  nextPage?: number;
}> {
  if (response.status === 404)
    return { status: false, msg: "Page is not found", redirect: false };
  if (response.status >= 500)
    return {
      status: false,
      msg: "The server is temporarily unavailable. Please try again shortly.",
      redirect: false,
    };
  let result;
  try {
    result = await response.json();
  } catch {
    return {
      status: false,
      msg: "The server returned an unexpected response. Please try again.",
      redirect: false,
    };
  }
  const status = response.ok && result?.status === true;
  return {
    status,
    msg: result?.data ?? "Unable to complete this request. Please try again.",
    redirect: status,
    nextPage: result?.nextPage,
  };
}
