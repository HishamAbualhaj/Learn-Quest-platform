
import { NextResponse } from "next/server";
import API_BASE_URL from "./config/config";
import useFetchServer from "./hooks/useFetchServer";

export async function middleware() {
  const res = await useFetchServer(`${API_BASE_URL}/session`, null, "GET");
  const response = NextResponse.next();
  response.cookies.set("user-session", JSON.stringify(res.msg), {
    httpOnly: false,
    path: "/",
  });

  return response;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],
};
