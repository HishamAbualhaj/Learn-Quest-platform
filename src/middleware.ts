import { NextRequest, NextResponse } from "next/server";
import API_BASE_URL from "./config/config";
import useFetchServer from "./hooks/useFetchServer";
import { User } from "./types";

export async function middleware(req: NextRequest) {
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
  const role = userData[0].role;

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

  // allow landing page while system is running
  if (url === "/" && !isMaintenance) {
    return NextResponse.next();
  }
  // allow maintenance page
  if (url === "/maintenance" && !isMaintenance) {
    return navigate("/", req);
  }

  // Only while system is shut down
  if (isMaintenance) {
    if (url === "/maintenance") {
      return NextResponse.next();
    }

    // go to admin dashboard
    if (role === "admin" && isAdmin) {
      return NextResponse.next();
    }

    return navigate("/maintenance", req);
  }

  // NOT LOGIN CASE
  if (!loggedIn) {
    if (isAllowedNotLogin || isAllowedForBoth) {
      return NextResponse.next();
    }
    return navigate("/login", req);
  }

  // LOGIN CASE
  if (isAllowedNotLogin) {
    return navigate("/", req);
  }

  if (isLoggedInShared || isAllowedForBoth) {
    return NextResponse.next();
  }

  // ALLOW ADMIN PAGES
  if ((isAdmin && role !== "admin") || (!isAdmin && role === "admin")) {
    return navigate("/", req);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],
};

const navigate = (route: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(route, req.url));
};
