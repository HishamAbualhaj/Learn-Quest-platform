import { NextRequest, NextResponse } from "next/server";
import API_BASE_URL from "./config/config";
import useFetchServer from "./hooks/useFetchServer";
import { User } from "./types";

export async function proxy(req: NextRequest) {
  const res = await useFetchServer(`${API_BASE_URL}/session`, null, "GET");

  const resMaintenance = await useFetchServer(
    `${API_BASE_URL}/getMaintenace`,
    null,
    "GET"
  );

  const isMaintenance = !resMaintenance.msg[0].status;

  const data = res.msg as unknown as { loggedIn: boolean; userData: User[] };
  const loggedIn = data.loggedIn;
  const userData = data.userData;
  const role = userData?.[0]?.role;

  const response = NextResponse.next();

  response.cookies.set("user-session", JSON.stringify(res.msg), {
    httpOnly: false,
    path: "/",
  });

  // isMaintenance is true which is server is went down

  const url = req.nextUrl.pathname;

  const isInSetFound = (url: string, routes: Set<string>) => routes.has(url);
  const isPrefixPath = (url: string, routes: Set<string>) =>
    [...routes].some((route) => url.startsWith(route));
  // only for admin
  const isAdminRoutes = new Set(["/dashboard"]);

  const loggedInSharedRoutes = new Set(["/student/coursepage"]);

  // allow these while not logined in
  const allowedRoutesWhileNotLogin = new Set([
    "/login",
    "/signup",
    "/forgotpassword",
    "/verifycode",
    "/confirmpass",
  ]);

  const allowedForBoth = new Set(["/student/allcourses", "/student/blog"]);

  const isAllowedForBoth = isInSetFound(url, allowedForBoth);

  const isAdmin = isPrefixPath(url, isAdminRoutes);

  const isAllowedNotLogin = isInSetFound(url, allowedRoutesWhileNotLogin);

  // both user and admin can access it ONLY WHILE LOGIN
  const isLoggedInShared = isPrefixPath(url, loggedInSharedRoutes);

  const excludedRoutes = new Set(["/logout"]);

  if (excludedRoutes.has(url)) {
    response.cookies.delete("user-session");
    return response;
  }

  // allow landing page while system is running
  if (url === "/" && !isMaintenance) {
    return response;
  }
  // allow maintenance page
  if (url === "/maintenance" && !isMaintenance) {
    return navigate("/", req);
  }

  // Only while system is shut down
  if (isMaintenance) {
    if (url === "/maintenance") {
      return response;
    }

    // go to admin dashboard
    if (role === "admin" && isAdmin) {
      return response;
    }

    return navigate("/maintenance", req);
  }

  // NOT LOGIN CASE
  if (!loggedIn) {
    if (isAllowedNotLogin || isAllowedForBoth) {
      return response;
    }
    return navigate("/login", req);
  }

  // LOGIN CASE
  if (isAllowedNotLogin) {
    return navigate("/", req);
  }

  if (isLoggedInShared || isAllowedForBoth) {
    return response;
  }

  // ALLOW ADMIN PAGES
  if ((isAdmin && role !== "admin") || (!isAdmin && role === "admin")) {
    return navigate("/", req);
  }
  return response;
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};

const navigate = (route: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(route, req.url));
};
