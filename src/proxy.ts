import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_BASE_URL } from "./config/config";
import type { User } from "./types";

type Session = { loggedIn: boolean; userData: User[] };

const GUEST_SESSION: Session = { loggedIn: false, userData: [] };
const CHECK_TIMEOUT_MS = 5_000;
const AUTH_ROUTES = new Set([
  "/login",
  "/signup",
  "/forgotpassword",
  "/verifycode",
  "/confirmpass",
]);
const PUBLIC_ROUTES = new Set(["/student/allcourses", "/student/blog"]);

// Match a route segment, so /dashboard-other isn't treated as /dashboard.
function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

async function fetchCheck(path: string, sessionId?: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_SERVER_BASE_URL}${path}`, {
      headers: sessionId ? { Cookie: `session_id=${sessionId}` } : {},
      cache: "no-store",
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result?.status === true ? result.data : null;
  } catch (error) {
    const cause = error as { cause?: { code?: string }; name?: string };
    console.warn(
      `Backend check unavailable: ${API_SERVER_BASE_URL}${path} (${cause.cause?.code ?? cause.name ?? "unknown error"})`,
    );
    return null;
  }
}

function parseSession(data: unknown): Session {
  if (!data || typeof data !== "object") return GUEST_SESSION;
  const session = data as Partial<Session>;
  if (session.loggedIn !== true || !Array.isArray(session.userData)) {
    return GUEST_SESSION;
  }
  const user = session.userData[0];
  if (!user || !["admin", "user", "teacher"].includes(user.role)) {
    return GUEST_SESSION;
  }
  // Only expose the frontend's user fields, never extra backend columns.
  const {
    student_id,
    first_name,
    last_name,
    email,
    gender,
    birthdate,
    image_url,
    joined_at,
    course_joined,
    role,
    status_user,
  } = user;
  return {
    loggedIn: true,
    userData: [
      {
        student_id,
        first_name,
        last_name,
        email,
        gender,
        birthdate,
        image_url,
        joined_at,
        course_joined,
        role,
        status_user,
      },
    ],
  };
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname.replace(/\/+$/, "") || "/";

  // The recovery page must render even while the API cannot be reached.
  if (pathname === "/unavailable") return NextResponse.next();

  // Logging out must still work when backend checks are unavailable.
  if (pathname === "/logout") {
    req.cookies.delete("user-session");
    const response = NextResponse.next({ request: { headers: req.headers } });
    response.cookies.delete("user-session");
    return response;
  }

  const sessionId = req.cookies.get("session_id")?.value;
  // These checks are independent. Guests need no backend session lookup.
  const [sessionData, maintenanceData] = await Promise.all([
    sessionId ? fetchCheck("/session", sessionId) : Promise.resolve(null),
    fetchCheck("/getMaintenace"),
  ]);
  const session = parseSession(sessionData);
  const role = session.userData[0]?.role;
  const isAdminRoute = matchesRoute(pathname, "/dashboard");
  const isAuthRoute = AUTH_ROUTES.has(pathname);
  const maintenanceStatus = Array.isArray(maintenanceData)
    ? maintenanceData[0]?.status
    : undefined;
  // A failed check is unknown, not an instruction to enable maintenance mode.
  if (![0, 1, false, true].includes(maintenanceStatus)) {
    const response = NextResponse.rewrite(new URL("/unavailable", req.url), {
      status: 503,
    });
    response.headers.set("Retry-After", "10");
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  const isMaintenance = maintenanceStatus === 0 || maintenanceStatus === false;

  let destination: string | undefined;
  if (isMaintenance) {
    if (pathname !== "/maintenance" && !(role === "admin" && isAdminRoute)) {
      destination = "/maintenance";
    }
  } else if (pathname === "/maintenance") {
    destination = "/";
  } else if (pathname !== "/") {
    if (!session.loggedIn) {
      if (!isAuthRoute && !PUBLIC_ROUTES.has(pathname)) destination = "/login";
    } else if (isAuthRoute) {
      destination = "/";
    } else if (
      !PUBLIC_ROUTES.has(pathname) &&
      !matchesRoute(pathname, "/student/allcourses") &&
      !matchesRoute(pathname, "/student/blog") &&
      ((isAdminRoute && role !== "admin") ||
        (!isAdminRoute && role === "admin"))
    ) {
      destination = "/";
    }
  }

  const sessionCookie = JSON.stringify(session);
  const previousSession = req.cookies.get("user-session")?.value;
  // Server Components must see the validated session on this request,
  // including the first request after login. Ignore the incoming copy.
  req.cookies.set("user-session", sessionCookie);
  const response = destination
    ? NextResponse.redirect(new URL(destination, req.url))
    : NextResponse.next({ request: { headers: req.headers } });

  if (previousSession !== sessionCookie) {
    response.cookies.set("user-session", sessionCookie, {
      httpOnly: true,
      secure: req.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!backend(?:/|$)|api(?:/|$)|_next(?:/|$)|.*\\.(?:png|jpe?g|svg|gif|webp|avif|ico|css|js|map|woff2?|ttf|mp4|webm|pdf|txt|xml)$).*)",
  ],
};
